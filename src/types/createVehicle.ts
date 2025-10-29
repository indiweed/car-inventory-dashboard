import { Vehicle } from './vehicle';

export interface CreateVehicleProps {
  onCreate: (vehicle: Vehicle) => void;
}