import { useState } from 'react';

export default function EditVehicle() {
  const [showModal, setShowModal] = useState(false);

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
        id="editVehicleModal"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Редактирование</h1>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="vehicleNameEdit" className="col-form-label">Марка</label>
                  <input type="text" className="form-control" id="vehicleNameEdit" placeholder='Марка автомобиля'/>
                </div>
                <div className="mb-3">
                  <label htmlFor="vehiclePriceEdit" className="col-form-label">Цена</label>
                  <input type="text" className="form-control" id="vehiclePriceEdit" placeholder='Стоимость автомобиля'/>
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