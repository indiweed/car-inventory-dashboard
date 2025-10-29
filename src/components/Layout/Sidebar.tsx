import { Vehicle } from "../../types/vehicle";
import CreateVehicle from "../Tools/CreateVehicle";
import EditVehicle from "../Tools/EditVehicle";
import SearchWithFilter from "./SearchWithFilters";
import SortVehicles from "../Tools/SortVehicles";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  onSearch: (query: string) => void;
  onFilter: (filters: {
    year: string[],
    minPrice: string,
    maxPrice: string
  }) => void;
  onSort: (sortOption: string) => void;
  onCreate: (vehicle: Vehicle) => void;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (vehicle: Vehicle) => void;
  infoMessage: string;
  onClearMessage: () => void;
}

function Sidebar({ isOpen, onClose, vehicles, onSearch, onFilter, onSort, onCreate, onEdit, onDelete, infoMessage, onClearMessage }: SidebarProps) {
  if (!isOpen) return null;

  return (
      <div className="sidebar bg-light h-100 p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <i className="bi bi-x h3 sidebar-close-btn m-0" onClick={onClose}></i>
          <CreateVehicle onCreate={onCreate}/>
        </div>
        
        <div className="mb-3">
          <SearchWithFilter vehicles={vehicles} onSearch={onSearch} onFilter={onFilter}/>
        </div>

        <div className="mb-3">
          <SortVehicles onSort={onSort} onFilter={onFilter}/>
        </div>

        <div className="vehicle-list">
          {infoMessage && (
            <div className="alert alert-info alert-dismissible fade show">
              {infoMessage}
              <button 
                type="button"
                className="btn-close" 
                onClick={onClearMessage}
              ></button>
            </div>
          )}
          {vehicles.map(vehicle => (
            <div key={vehicle.id} className="card mb-2">
              <div className="vehicle-tools">
                <EditVehicle vehicle={vehicle} onEdit={onEdit}/>
                <button className="btn text-danger" onClick={() => onDelete(vehicle)}><i className="bi bi-trash"></i></button>
              </div>
              <div className="card-body p-2">
                <h6 className="card-title mb-1">{vehicle.name} {vehicle.model}</h6>
                <p className="card-text mb-1 small">
                  {vehicle.year}<i className="bi bi-dot"></i>${vehicle.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

export default Sidebar;