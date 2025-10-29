import { Vehicle } from "./vehicle";

export interface EditVehicleProps {
    vehicle: Vehicle;
    onEdit: (updatedVehicle: Vehicle) => void;
  }