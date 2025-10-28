import { useState } from 'react';
import { Vehicle } from '../../types/vehicle';
import { getUniqueYears } from '../../services/getUniqueYears';

interface SearchWithFiltersProps {
    vehicles: Vehicle[];
    onSearch: (query: string) => void;
    onFilter: (filters: {
      year: string[],
      minPrice: string,
      maxPrice: string
    }) => void;
}

export default function SearchWithFilter({vehicles, onSearch, onFilter}: SearchWithFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [minPriceValue, setMinPriceValue] = useState('');
  const [maxPriceValue, setMaxPriceValue] = useState('');

  const handleFilterClick = () => {
    setShowFilters(!showFilters);
  };

  const handleYearChange = (year: string) => {
    setSelectedYears(prev => {
      if (prev.includes(year)) {
        return prev.filter(y => y !== year);
      } else {
        return [...prev, year];
      }
    });
  };

  const handleSelectAllYears = () => {
    setSelectedYears([]);
  };

  const handleApplyFilters = () => {
    onFilter({
      year: selectedYears,
      minPrice: minPriceValue, 
      maxPrice: maxPriceValue
    });
  }

  const handleResetFilters = () => {
    setSelectedYears([]);
    setMinPriceValue('');
    setMaxPriceValue('');
    setSearchQuery('');
    onSearch('');
    onFilter({ year: [], minPrice: '', maxPrice: '' });
  }

  return (
    <div className="search-filter-container">
      <div className="input-group mb-2">
        <button
          type="button"
          className="btn sidebar-filter"
          onClick={handleFilterClick}
        >
          <i className={`bi bi-funnel${showFilters ? '-fill' : ''}`}></i>
        </button>
        <input
          type="text"
          className="form-control"
          placeholder="Поиск автомобилей..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDownCapture={(e) => e.key === 'Enter' && onSearch(searchQuery)}
        />
        {searchQuery && (
          <i 
            className='bi bi-x position-absolute top-50 end-0 translate-middle-y me-5'
            style={{ cursor: 'pointer', zIndex: 5 }}
            onClick={() => {
              setSearchQuery('');
              onSearch('');
            }}
          ></i>
        )}
      <button
        type="button"
        className="btn sidebar-search"
        onClick={() => onSearch(searchQuery)}
      >
        <i className="bi bi-search"></i>
      </button>
    </div>

      {showFilters && (
        <div className="filters-dropdown card p-3 mb-3">
          <div className="row g-2">

            <div className="col-md-6">
              <label className="form-label small fw-bold">Цена</label>
              <div className="d-flex flex-column gap-3">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="От"
                  value={minPriceValue}
                  onChange={(e) => setMinPriceValue(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="До"
                  value={maxPriceValue}
                  onChange={(e) => setMaxPriceValue(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-6">
            <label className="form-label small fw-bold">Год</label>
              <div className="years-checkboxes">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="yearFilter"
                    id="year-all"
                    checked={selectedYears.length === 0}
                    onChange={handleSelectAllYears}
                  />
                  <label className="form-check-label small" htmlFor="year-all">
                    Все годы
                  </label>
                </div>
                {getUniqueYears(vehicles).map(year => (
                  <div key={year} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="yearFilter"
                      id={`year-${year}`}
                      checked={selectedYears.includes(year.toString())}
                      onChange={() => handleYearChange(year.toString())}
                    />
                    <label className="form-check-label small" htmlFor={`year-${year}`}>
                      {year}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-3">
              <button
                type="button"
                className="btn btn-outline-danger btn-sm me-2"
                onClick={handleResetFilters}
              >
                <i className="bi bi-arrow-clockwise me-1"></i>
                Сбросить
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleApplyFilters}
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