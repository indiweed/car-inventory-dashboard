import { useState } from 'react';
import { Vehicle } from '../types/vehicle';
import { CreateVehicleProps } from '../types/createVehicle';

export const useCreateVehicle = ({ onCreate }: CreateVehicleProps) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    price: 0,
    latitude: 0,
    longitude: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return 'Укажите марку автомобиля';
    if (!formData.model.trim()) return 'Укажите модель автомобиля';
    if (!formData.color.trim()) return 'Укажите цвет автомобиля';
    if (!formData.year || formData.year < 1800) return 'Укажите корректный год выпуска';
    if (formData.price <= 0) return 'Цена должна быть больше 0';
    return null;
  };

  const handleSave = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const newVehicle: Vehicle = {
        id: Date.now(),
        ...formData
      };

      onCreate(newVehicle);
      setShowModal(false);
      resetForm();
    } catch (err) {
      setError('Ошибка при создании автомобиля');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      model: '',
      year: new Date().getFullYear(),
      color: '',
      price: 0,
      latitude: 0,
      longitude: 0
    });
    setError('');
  };

  const updateField = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClose = () => {
    setShowModal(false);
    resetForm();
  };

  return {
    showModal,
    setShowModal,
    formData,
    updateField,
    loading,
    error,
    handleSave,
    handleClose,
    resetForm
  };
};