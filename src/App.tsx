import { useState, useEffect } from 'react';
import { Vehicle } from './types/vehicle';
import { fetchVehicles } from './services/fetchVehicles';
import Sidebar from './components/Layout/Sidebar';
import VehiclesMap from './components/Map/VehiclesMap';
import CreateVehicle from './components/Layout/SidebarTools/CreateVehicle';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'leaflet/dist/leaflet.css';
import './App.css';

export default function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
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
        vehicles={vehicles}
      />

      <div className="map-container">
        <VehiclesMap vehicles={vehicles} />
      </div>
    </div>
  );
}