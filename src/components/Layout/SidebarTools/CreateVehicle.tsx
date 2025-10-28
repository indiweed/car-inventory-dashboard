import { useState } from 'react';
import { Vehicle } from '../../../types/vehicle';

interface CreateVehicleProps {
  onCreate: (vehicle: Vehicle) => void;
}

export default function CreateVehicle({onCreate}: CreateVehicleProps) {
  const [showModal, setShowModal] = useState(false);
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState<number>(new Date().getFullYear());
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePrice, setVehiclePrice] = useState<number>(0);
  const [vehicleLatitude, setVehicleLatitude] = useState<number>(0);
  const [vehicleLongitude, setVehicleLongitude] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSave = async () => {
    setLoading(true);
    setError('');
    
    if (!vehicleName.trim()) {
      setError('Укажите марку автомобиля');
      setLoading(false);
      return;
    }
    if (!vehicleModel.trim()) {
      setError('Укажите модель автомобиля');
      setLoading(false);
      return;
    }
    if (!vehicleColor.trim()) {
      setError('Укажите цвет автомобиля');
      setLoading(false);
      return;
    }
    if (!vehicleYear || vehicleYear < 1800) {
      setError('Укажите корректный год выпуска');
      setLoading(false);
      return;
    }
    if (vehiclePrice <= 0) {
      setError('Цена должна быть больше 0');
      setLoading(false);
      return;
    }
  
    try {
      const newVehicle: Vehicle = {
        id: Date.now(),
        name: vehicleName,
        model: vehicleModel,
        year: vehicleYear,
        color: vehicleColor,
        price: vehiclePrice,
        latitude: vehicleLatitude,
        longitude: vehicleLongitude
      };
  
      onCreate(newVehicle);
      setShowModal(false);
      resetForm();
    } catch (err) {
      setError('Ошибка при создании автомобиля');
    } finally {
      setLoading(false);
    }
  }

  const resetForm = () => {
    setVehicleName('');
    setVehicleModel('');
    setVehicleYear(new Date().getFullYear());
    setVehicleColor('');
    setVehiclePrice(0);
    setVehicleLatitude(0);
    setVehicleLongitude(0);
    setError('');
  }

  const handleClose = () => {
    setShowModal(false);
    resetForm();
  }

  return (
    <>
      <button 
        type="button" 
        className="btn btn-primary" 
        onClick={() => setShowModal(true)}
      >
        <i className="bi bi-plus-circle me-2"></i>
        Добавить авто
      </button>

      <div 
        className={`modal fade ${showModal ? 'show' : ''}`} 
        style={{ display: showModal ? 'block' : 'none' }}
        id="createVehicleModal"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Добавление автомобиля</h1>
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
              <form onSubmit={(e) => { e.preventDefault(); handleSave() }}>
                <div className="mb-3">
                  <label htmlFor="vehicleName" className="col-form-label">Марка</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="vehicleName" 
                    placeholder='Марка автомобиля*' 
                    value={vehicleName} 
                    onChange={(e) => setVehicleName(e.target.value)} 
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="vehicleModel" className="col-form-label">Модель</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="vehicleModel" 
                    placeholder='Модель автомобиля*' 
                    value={vehicleModel} 
                    onChange={(e) => setVehicleModel(e.target.value)} 
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="vehicleYear" className="col-form-label">Год выпуска</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="vehicleYear" 
                    placeholder='Год выпуска автомобиля*' 
                    value={vehicleYear}
                    onChange={(e) => setVehicleYear(Number(e.target.value))} 
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="vehicleColor" className="col-form-label">Цвет</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="vehicleColor" 
                    placeholder='Цвет автомобиля*' 
                    value={vehicleColor}
                    onChange={(e) => setVehicleColor(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="vehiclePrice" className="col-form-label">Цена</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="vehiclePrice" 
                    placeholder='Стоимость автомобиля*' 
                    value={vehiclePrice}
                    onChange={(e) => setVehiclePrice(Number(e.target.value))}  
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
                disabled={loading}
              >
                Отмена
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Сохранение...
                  </>
                ) : (
                  'Сохранить'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
}