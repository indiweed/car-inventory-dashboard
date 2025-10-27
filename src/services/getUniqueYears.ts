import { Vehicle } from "../types/vehicle";

export const getUniqueYears = (vehicles: Vehicle[]) => {
    return Array.from(new Set(vehicles.map(v => v.year)))
      .sort((a, b) => b - a);
  };