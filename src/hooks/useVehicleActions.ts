import { useCallback } from 'react';
import { Vehicle } from '../types/vehicle';

export const useVehicleActions = (
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>,
  setInfoMessage: (message: string) => void
) => {
  const handleCreate = useCallback((newVehicle: Vehicle) => {
    setVehicles(prev => [...prev, newVehicle]);
    setInfoMessage('Автомобиль успешно создан');
    setTimeout(() => setInfoMessage(''), 3000);
  }, [setVehicles, setInfoMessage]);

  const handleEdit = useCallback((updatedVehicle: Vehicle) => {
    setVehicles(prev => prev.map(vehicle => 
      vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
    ));
    setInfoMessage('Автомобиль успешно обновлен');
    setTimeout(() => setInfoMessage(''), 3000);
  }, [setVehicles, setInfoMessage]);

  const handleDelete = useCallback((vehicle: Vehicle) => {
    setVehicles(prev => prev.filter(v => v.id !== vehicle.id));
  }, [setVehicles]);

  return { handleCreate, handleEdit, handleDelete };
};