import { Vehicle } from './vehicle';

export interface SearchWithFiltersProps {
  vehicles: Vehicle[];
  onSearchAndFilter: (filteredVehicles: Vehicle[]) => void;
}