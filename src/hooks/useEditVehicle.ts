import { useState, useCallback } from 'react';
import { Vehicle } from '../types/vehicle';

interface UseEditVehicleProps {
  vehicle: Vehicle;
  onEdit: (updatedVehicle: Vehicle) => void;
}

export const useEditVehicle = ({ vehicle, onEdit }: UseEditVehicleProps) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: vehicle.name,
    model: vehicle.model,
    price: vehicle.price,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = useCallback((): string | null => {
    if (!formData.name.trim()) return 'Введите марку автомобиля';
    if (!formData.model.trim()) return 'Введите модель автомобиля';
    if (formData.price <= 0) return 'Цена должна быть больше 0';
    return null;
  }, [formData]);

  const handleSave = useCallback(async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const updatedVehicle: Vehicle = {
        ...vehicle,
        ...formData
      };

      await onEdit(updatedVehicle);
      setShowModal(false);
    } catch (err) {
      setError('Ошибка при сохранении изменений');
    } finally {
      setLoading(false);
    }
  }, [vehicle, formData, onEdit, validateForm]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setFormData({
      name: vehicle.name,
      model: vehicle.model,
      price: vehicle.price
    });
    setError('');
  }, [vehicle]);

  const updateField = useCallback((field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  return {
    showModal,
    setShowModal,
    formData,
    updateField,
    loading,
    error,
    handleSave,
    handleClose
  };
};