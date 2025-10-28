import { useState, useEffect } from 'react';
import { Vehicle } from './types/vehicle';
import { fetchVehicles } from './services/fetchVehicles';
import { getSearchVehicles } from './services/getSearchVehicles';
import Sidebar from './components/Layout/Sidebar';
import VehiclesMap from './components/Map/VehiclesMap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'leaflet/dist/leaflet.css';
import './App.css';

export default function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchableVehicles, setSearchableVehicles] = useState<Vehicle[]>(vehicles);
  const [infoMessage, setInfoMessage] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchVehicles();
        setVehicles(data);
      } catch (err) {
        console.error('Ошибка при загрузке:', err);
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  useEffect(() => {
    setSearchableVehicles(vehicles);
  }, [vehicles]);

  const handleSearch = (searchQuery: string) => {
    const searchVehicles = getSearchVehicles(vehicles, searchQuery);
    
    if (searchVehicles.length === 0 && searchQuery) {
      setInfoMessage(`Не найдено автомобилей по запросу "${searchQuery}"`);
    } else {
      setInfoMessage('');
    }
    
    setSearchableVehicles(searchVehicles);
  };

  const handleFilters = (
    filters: {
      year: string[],
      minPrice: string,
      maxPrice: string
    }
  ) => {
    let filtered = vehicles

    if (filters.year.length > 0) {
      filtered = filtered.filter(vehicle => filters.year.includes(vehicle.year.toString()))
    }

    if (filters.minPrice) {
      filtered = filtered.filter(vehicle => vehicle.price >= parseInt(filters.minPrice))
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(vehicle => vehicle.price <= parseInt(filters.maxPrice))
    }

    if (filtered.length === 0) {
      setInfoMessage('По текущим параметрам ничего не найдено')
    } else {
      setInfoMessage('');
    }

    setSearchableVehicles(filtered)
  }

  const handleCreate = (newVehicle: Vehicle) => {
    setVehicles(prev => [...prev, newVehicle]);
    setInfoMessage('Автомобиль успешно создан');
    setTimeout(() => setInfoMessage(''), 3000);
  };

  const handleEdit = (updatedVehicle: Vehicle) => {
    setVehicles(prev => prev.map(vehicle => 
      vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
    ));
    setInfoMessage('Автомобиль успешно обновлен');
    setTimeout(() => setInfoMessage(''), 3000);
  };

  const clearMessage = () => {
    setInfoMessage('');
  };

  const deleteVehicle = (vehicle: Vehicle) => {
    setVehicles(prev => prev.filter(v => v.id !== vehicle.id));
  }

  if (loading) {
    return (
      <div className="app-container d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
          <p className="mt-2">Загружаем данные о машинах...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container d-flex justify-content-center align-items-center">
        <div className="alert alert-danger text-center">
          <h5>Ошибка при загрузке данных</h5>
          <p>{error}</p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <button 
        className={`btn btn-light sidebar-toggle ${isSidebarOpen ? 'd-none' : ''}`}
        onClick={() => setIsSidebarOpen(true)}
      >
        <i className='bi bi-list'></i>
      </button>
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        vehicles={searchableVehicles}
        onSearch={handleSearch}
        onFilter={handleFilters}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={deleteVehicle}
        infoMessage={infoMessage}
        onClearMessage={clearMessage}
      />

      <div className="map-container">
        <VehiclesMap vehicles={vehicles} />
      </div>
    </div>
  );
}