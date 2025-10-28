import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Vehicle } from '../../types/vehicle';
import 'leaflet/dist/leaflet.css';

interface VehiclesMapProps {
  vehicles: Vehicle[];
}

function VehiclesMap({ vehicles }: VehiclesMapProps) {
  const center = vehicles.length > 0 
    ? [vehicles[0].latitude, vehicles[0].longitude] 
    : [59.932872, 30.347827];

  return (
    <MapContainer 
      center={center as [number, number]} 
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {vehicles.map(vehicle => (
        <Marker 
          key={vehicle.id} 
          position={[vehicle.latitude, vehicle.longitude]}
        >
          <Popup>
            <div>
              <h6>{vehicle.name} {vehicle.model}</h6>
              <p>
                Год: {vehicle.year}<br />
                Цвет: {vehicle.color}<br />
                Цена: ${vehicle.price}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default VehiclesMap;