import { useState } from 'react';
import { Vehicle } from './types/vehicle';
import { mockVehicles } from './mocks/vehicles';
import Sidebar from './components/Layout/Sidebar';
import VehiclesMap from './components/Map/VehiclesMap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'leaflet/dist/leaflet.css';
import './App.css';

export default function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        vehicles={vehicles}
      />

      <div className="map-container">
        <VehiclesMap vehicles={vehicles} />
      </div>
      
      <button 
        className={`btn btn-light sidebar-toggle ${isSidebarOpen ? 'd-none' : ''}`}
        onClick={() => setIsSidebarOpen(true)}
      >
        <i className='bi bi-list'></i>
      </button>
    </div>
  );
}