import { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import VehiclesMap from './components/Map/VehiclesMap';
import { useVehicles } from './hooks/useVehicles';
import { useVehicleActions } from './hooks/useVehicleActions';
import { useVehicleSearch } from './hooks/useVehicleSearch';
import { useSidebar } from './hooks/useSidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'leaflet/dist/leaflet.css';
import './App.css';

export default function App() {
  const { vehicles, loading, error, setVehicles } = useVehicles();
  const [infoMessage, setInfoMessage] = useState('');
  const { isSidebarOpen, openSidebar, closeSidebar } = useSidebar();
  
  const { searchableVehicles, handleSearch, handleFilters, handleSort, clearMessage } = 
    useVehicleSearch(vehicles);
  
  const { handleCreate, handleEdit, handleDelete } = 
    useVehicleActions(setVehicles, setInfoMessage);

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
        onClick={openSidebar}
      >
        <i className='bi bi-list'></i>
      </button>
      
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        vehicles={searchableVehicles}
        onSearch={handleSearch}
        onFilter={handleFilters}
        onSort={handleSort}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        infoMessage={infoMessage}
        onClearMessage={clearMessage}
      />

      <div className="map-container">
        <VehiclesMap vehicles={vehicles} />
      </div>
    </div>
  );
}