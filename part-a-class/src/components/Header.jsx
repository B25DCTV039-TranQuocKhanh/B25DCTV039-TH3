import React, { Component } from 'react';
import Clock from './Clock';

class Header extends Component {
  render() {
    const { showClock, onToggleClock } = this.props;
    return (
      <header className="header">
        <h1>Quản Lý Chi Tiêu Hằng Ngày</h1>
        <div className="header-controls">
          {showClock && <Clock />}
          <button type="button" className="btn-secondary" onClick={onToggleClock}>
            {showClock ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
