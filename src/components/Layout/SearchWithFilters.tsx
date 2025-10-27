import { useState } from 'react';
import { Vehicle } from '../../types/vehicle';
import { getUniqueYears } from '../../services/getUniqueYears';

interface SearchWithFiltersProps {
    vehicles: Vehicle[];
}

export default function SearchWithFilter({vehicles}: SearchWithFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  const handleFilterClick = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="search-filter-container">
      <div className="input-group mb-2">
        <span className="input-group-text bg-light">
          <i className="bi bi-search text-muted"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Поиск автомобилей..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleFilterClick}
        >
          <i className={`bi bi-funnel${showFilters ? '-fill' : ''}`}></i>
        </button>
      </div>

      {showFilters && (
        <div className="filters-dropdown card p-3 mb-3">
          <div className="row g-2">

            <div className="col-md-6">
              <label className="form-label small fw-bold">Цена</label>
              <div className="input-group input-group-sm">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="От"
                />
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="До"
                />
              </div>
            </div>

            <div className="col-md-6">
                <label className="form-label small fw-bold">Год</label>
                <select className='form-select form-select-sm'>
                    {getUniqueYears(vehicles).map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-3">
              <button
                type="button"
                className="btn btn-outline-danger btn-sm me-2"
              >
                <i className="bi bi-arrow-clockwise me-1"></i>
                Сбросить
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
              >
                <i className="bi bi-check-lg me-1"></i>
                Применить
              </button>
          </div>
        </div>
      )}
    </div>
  );
}