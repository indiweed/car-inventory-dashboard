import { Vehicle } from "../types/vehicle";

export const getSearchVehicles = (vehicles: Vehicle[], e: string) => {
    const result = vehicles.filter((vehicle) => vehicle.name.toLowerCase().includes(e.toLowerCase()))
    return result
};