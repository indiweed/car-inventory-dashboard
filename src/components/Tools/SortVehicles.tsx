import { useState } from 'react';
import { Vehicle } from '../../types/vehicle';

interface SortVehiclesProps {
  onSort: (sortOption: string) => void;
  onFilter: (filters: {
    year: string[],
    minPrice: string,
    maxPrice: string
  }) => void;
}

export default function SortVehicles({ onSort, onFilter }: SortVehiclesProps) {
  const [sortOption, setSortOption] = useState('');

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
    onSort(selectedOption);
  };

  const handleResetSort = () => {
    setSortOption('');
    onSort('');
    onFilter({ year: [], minPrice: '', maxPrice: '' });
  };

  return (
    <div className="sort-container">
      <div className="d-flex align-items-center gap-2">
        <label htmlFor="sortSelect" className="form-label small fw-bold mb-0">
          Сортировка:
        </label>
        <select
          id="sortSelect"
          className="form-select form-select-sm"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="">Без сортировки</option>
          <option value="year-asc">По году (сначала старые)</option>
          <option value="year-desc">По году (сначала новые)</option>
          <option value="price-asc">По цене (сначала дешевые)</option>
          <option value="price-desc">По цене (сначала дорогие)</option>
        </select>
        
        {sortOption && (
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={handleResetSort}
            title="Сбросить сортировку"
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>
        )}
      </div>
    </div>
  );
}