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
  const [searchMessage, setSearchMessage] = useState('');
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
      setSearchMessage(`Не найдено автомобилей по запросу "${searchQuery}"`);
    } else {
      setSearchMessage('');
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
      filtered = filtered.filter(vehicle =>filters.year.includes(vehicle.year.toString()))
    }

    if (filters.minPrice) {
      filtered = filtered.filter(vehicle => vehicle.price >= parseInt(filters.minPrice))
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(vehicle => vehicle.price <= parseInt(filters.maxPrice))
    }

    setSearchableVehicles(filtered)
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
        searchMessage={searchMessage}
      />

      <div className="map-container">
        <VehiclesMap vehicles={vehicles} />
      </div>
    </div>
  );
}