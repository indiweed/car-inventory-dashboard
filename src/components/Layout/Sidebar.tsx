import { Vehicle } from "../../types/vehicle";
import CreateVehicle from "./SidebarTools/CreateVehicle";
import EditVehicle from "./SidebarTools/EditVehicle";
import DeleteVehicle from "./SidebarTools/DeleteVehicle";
import SearchWithFilter from "./SearchWithFilters";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
}

function Sidebar({ isOpen, onClose, vehicles }: SidebarProps) {
  if (!isOpen) return null;

  return (
      <div className="sidebar bg-light h-100 p-3" style={{ width: '300px' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button 
            className="btn btn-lg"
            onClick={onClose}
          >
          <i className="bi bi-x"></i>
          </button>
          <CreateVehicle/>
        </div>
        <div className="mb-3">
          <SearchWithFilter vehicles={vehicles}/>
        </div>
        <div className="vehicle-list">
          {vehicles.map(vehicle => (
            <div key={vehicle.id} className="card mb-2">
              <div className="vehicle-tools">
                <EditVehicle/>
                <DeleteVehicle/>
              </div>
              <div className="card-body p-2">
                <h6 className="card-title mb-1">{vehicle.name} {vehicle.model}</h6>
                <p className="card-text mb-1 small">
                  {vehicle.year} <i className="bi bi-dot"></i> ${vehicle.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

export default Sidebar;