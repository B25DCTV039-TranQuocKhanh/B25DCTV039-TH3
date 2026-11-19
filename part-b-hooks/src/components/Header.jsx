import React, { useContext } from 'react';
import Clock from './Clock';
import { ThemeContext } from '../context/ThemeContext';

function Header({ showClock, onToggleClock }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <h1>Quản Lý Chi Tiêu (Hooks)</h1>
      <div className="header-controls">
        {showClock && <Clock />}
        <button type="button" className="btn-secondary" onClick={onToggleClock}>
          {showClock ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
        </button>
        <button type="button" className="btn-secondary" onClick={toggleTheme}>
          {theme === 'light' ? 'Chế độ tối' : 'Chế độ sáng'}
        </button>
      </div>
    </header>
  );
}

export default Header;