import { useState, useEffect, useCallback } from 'react';
import { Vehicle } from '../types/vehicle';
import { getSearchVehicles } from '../services/getSearchVehicles';

export const useVehicleSearch = (vehicles: Vehicle[]) => {
  const [searchableVehicles, setSearchableVehicles] = useState<Vehicle[]>(vehicles);
  const [infoMessage, setInfoMessage] = useState('');

  useEffect(() => {
    setSearchableVehicles(vehicles);
  }, [vehicles]);

  const handleSearch = useCallback((searchQuery: string) => {
    const searchVehicles = getSearchVehicles(vehicles, searchQuery);
    
    if (searchVehicles.length === 0 && searchQuery) {
      setInfoMessage(`Не найдено автомобилей по запросу "${searchQuery}"`);
    } else {
      setInfoMessage('');
    }
    
    setSearchableVehicles(searchVehicles);
  }, [vehicles]);

  const handleFilters = useCallback((
    filters: {
      year: string[],
      minPrice: string,
      maxPrice: string
    }
  ) => {
    let filtered = vehicles;

    if (filters.year.length > 0) {
      filtered = filtered.filter(vehicle => filters.year.includes(vehicle.year.toString()));
    }

    if (filters.minPrice) {
      filtered = filtered.filter(vehicle => vehicle.price >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(vehicle => vehicle.price <= parseInt(filters.maxPrice));
    }

    if (filtered.length === 0) {
      setInfoMessage('По текущим параметрам ничего не найдено');
    } else {
      setInfoMessage('');
    }

    setSearchableVehicles(filtered);
  }, [vehicles]);

  const handleSort = useCallback((sortOption: string) => {
    let sortedVehicles = [...searchableVehicles];

    switch (sortOption) {
      case 'year-asc':
        sortedVehicles.sort((a, b) => a.year - b.year);
        break;
      case 'year-desc':
        sortedVehicles.sort((a, b) => b.year - a.year);
        break;
      case 'price-asc':
        sortedVehicles.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedVehicles.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setSearchableVehicles(sortedVehicles);
  }, [searchableVehicles]);

  const clearMessage = useCallback(() => {
    setInfoMessage('');
  }, []);

  return {
    searchableVehicles,
    infoMessage,
    handleSearch,
    handleFilters,
    handleSort,
    clearMessage,
    setInfoMessage
  };
};