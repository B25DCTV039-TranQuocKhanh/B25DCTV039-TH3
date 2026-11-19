import React from 'react';

const CATEGORIES = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

function CategoryStats({ expenses }) {
  return (
    <div className="stats-grid">
      {CATEGORIES.map((category) => {
        const total = expenses
          .filter((item) => item.category === category)
          .reduce((sum, item) => sum + Number(item.amount), 0);

        return (
          <div key={category} className="stat-card">
            <span className="stat-label">{category}</span>
            <strong className="stat-value">{total.toLocaleString('vi-VN')} đ</strong>
          </div>
        );
      })}
    </div>
  );
}

export default CategoryStats;