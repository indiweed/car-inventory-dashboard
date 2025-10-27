
import { Vehicle } from '../types/vehicle';

export const fetchVehicles = async (): Promise<Vehicle[]> => {
  try {
    const response = await fetch('https://ofc-test-01.tspb.su/test-task/vehicles');
    
    if (!response.ok) {
      throw new Error(`HTTP ошибка! Код: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};