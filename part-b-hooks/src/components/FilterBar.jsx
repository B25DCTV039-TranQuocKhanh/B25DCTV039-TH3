import React from 'react';

const FILTER_OPTIONS = ['Tất cả', 'Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

function FilterBar({ selectedCategory, onSelectCategory, searchTerm, onSearchChange }) {
  return (
    <div className="filter-section">
      <div className="filter-bar">
        <span>Lọc theo loại:</span>
        <div className="filter-buttons">
          {FILTER_OPTIONS.map((category) => (
            <button
              key={category}
              type="button"
              className={selectedCategory === category ? 'filter-btn active' : 'filter-btn'}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <input
        type="text"
        className="search-input"
        placeholder="Tìm kiếm theo nội dung..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default FilterBar;