import React, { Component } from 'react';

const FILTER_OPTIONS = ['Tất cả', 'Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

class FilterBar extends Component {
  render() {
    const { selectedCategory, onSelectCategory } = this.props;

    return (
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
    );
  }
}

export default FilterBar;