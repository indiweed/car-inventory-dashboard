import { useState, useEffect } from "react";
import { fetchVehicles } from "../services/fetchVehicles";
import { Vehicle } from "../types/vehicle";

export const useVehicles = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const loadVehicles = async () => {
        try {
          setLoading(true);
          setError(null);
          const data = await fetchVehicles();
          setVehicles(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        } finally {
          setLoading(false);
        }
      };
      loadVehicles();
    }, []);
  
    return { vehicles, loading, error, setVehicles };
  };