import { useState } from 'react';

export default function CreateVehicle() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button 
        type="button" 
        className="btn btn-primary" 
        onClick={() => setShowModal(true)}
      >
        <i className="bi bi-plus-circle me-2"></i>
        Новый автомобиль
      </button>

      <div 
        className={`modal fade ${showModal ? 'show' : ''}`} 
        style={{ display: showModal ? 'block' : 'none' }}
        id="createVehicleModal"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Создание автомобиля</h1>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="vehicleName" className="col-form-label">Марка</label>
                  <input type="text" className="form-control" id="vehicleName" placeholder='Марка автомобиля*' required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="vehicleModel" className="col-form-label">Модель</label>
                  <input type="text" className="form-control" id="vehicleModel" placeholder='Модель автомобиля*' required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="vehicleYear" className="col-form-label">Год выпуска</label>
                  <input type="number" className="form-control" id="vehicleYear" placeholder='Год выпуска автомобиля*' required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="vehicleColor" className="col-form-label">Цвет</label>
                  <input type="text" className="form-control" id="vehicleColor" placeholder='Цвет автомобиля*' required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="vehiclePrice" className="col-form-label">Цена</label>
                  <input type="text" className="form-control" id="vehiclePrice" placeholder='Стоимость автомобиля*' required/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setShowModal(false)}
              >
                Отмена
              </button>
              <button type="button" className="btn btn-primary">Сохранить</button>
            </div>
          </div>
        </div>
      </div>
      
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
}