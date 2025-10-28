import { useState } from 'react';
import { Vehicle } from '../../../types/vehicle';

interface EditVehicleProps {
  vehicle: Vehicle;
  onEdit: (updatedVehicle: Vehicle) => void;
}

export default function EditVehicle({ vehicle, onEdit }: EditVehicleProps) {
  const [showModal, setShowModal] = useState(false);
  const [vehicleName, setVehicleName] = useState(vehicle.name);
  const [vehiclePrice, setVehiclePrice] = useState(vehicle.price);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!vehicleName.trim()) {
      setError('Введите марку автомобиля');
      return;
    }
    if (vehiclePrice <= 0) {
      setError('Цена должна быть больше 0');
      return;
    }

    const updatedVehicle: Vehicle = {
      ...vehicle,
      name: vehicleName.trim(),
      price: vehiclePrice
    };

    onEdit(updatedVehicle);
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
    setVehicleName(vehicle.name);
    setVehiclePrice(vehicle.price);
    setError('');
  };

  return (
    <>
      <button 
        type="button" 
        className="btn" 
        onClick={() => setShowModal(true)}
      >
        <i className="bi bi-pencil-square"></i>
      </button>

      <div 
        className={`modal fade ${showModal ? 'show' : ''}`} 
        style={{ display: showModal ? 'block' : 'none' }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Редактирование</h1>
              <button 
                type="button" 
                className="btn-close" 
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="mb-3">
                  <label htmlFor="vehicleNameEdit" className="col-form-label">Марка</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="vehicleNameEdit" 
                    value={vehicleName} 
                    onChange={(e) => setVehicleName(e.target.value)} 
                    placeholder='Марка автомобиля'
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="vehiclePriceEdit" className="col-form-label">Цена</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="vehiclePriceEdit" 
                    value={vehiclePrice} 
                    onChange={(e) => setVehiclePrice(Number(e.target.value))} 
                    placeholder='Стоимость автомобиля'
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleClose}
              >
                Отмена
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleSave}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
}