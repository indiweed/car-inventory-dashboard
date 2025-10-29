import { useEditVehicle } from '../../hooks/useEditVehicle';
import { EditVehicleProps } from '../../types/editVehicle';

export default function EditVehicle({ vehicle, onEdit }: EditVehicleProps) {
  const {
    showModal,
    setShowModal,
    formData,
    updateField,
    loading,
    error,
    handleSave,
    handleClose
  } = useEditVehicle({ vehicle, onEdit });

  return (
    <>
      <button 
        type="button" 
        className="btn" 
        onClick={() => setShowModal(true)}
      >
        <i className="bi bi-pencil-square"></i>
      </button>

      <div className={`modal fade ${showModal ? 'show' : ''}`} 
           style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Редактирование {vehicle.name} {vehicle.model}</h1>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}
              
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="mb-3">
                  <label htmlFor="vehicleNameEdit" className="col-form-label">Марка</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={formData.name} 
                    onChange={(e) => updateField('name', e.target.value)} 
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="vehicleModelEdit" className="col-form-label">Модель</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={formData.model} 
                    onChange={(e) => updateField('model', e.target.value)} 
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="vehiclePriceEdit" className="col-form-label">Цена</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={formData.price} 
                    onChange={(e) => updateField('price', Number(e.target.value))} 
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Отмена
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSave} disabled={loading}>
                {loading ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
}