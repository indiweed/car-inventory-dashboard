import { useCreateVehicle } from '../../hooks/useCreateVehicle';
import { CreateVehicleProps } from '../../types/createVehicle';

export default function CreateVehicle({ onCreate }: CreateVehicleProps) {
  const {
    showModal,
    setShowModal,
    formData,
    updateField,
    loading,
    error,
    handleSave,
    handleClose
  } = useCreateVehicle({ onCreate });

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

      <div className={`modal fade ${showModal ? 'show' : ''}`} 
           style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Добавление автомобиля</h1>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div className="mb-3">
                  <label htmlFor="vehicleName" className="col-form-label">Марка</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="vehicleName" 
                    placeholder='Марка автомобиля*' 
                    value={formData.name} 
                    onChange={(e) => updateField('name', e.target.value)} 
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
                    value={formData.model} 
                    onChange={(e) => updateField('model', e.target.value)} 
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
                    value={formData.year}
                    onChange={(e) => updateField('year', e.target.value)} 
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
                    value={formData.color}
                    onChange={(e) => updateField('color', e.target.value)}
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
                    value={formData.price}
                    onChange={(e) => updateField('price', e.target.value)}  
                    required
                  />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Отмена
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSave}>
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