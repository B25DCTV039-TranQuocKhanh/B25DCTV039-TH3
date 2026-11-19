import React from 'react';
import { useClock } from '../hooks/useClock';

function Clock() {
  const time = useClock();

  return (
    <div className="clock-box">
      <span>{time.toLocaleTimeString('vi-VN')}</span>
      <span> | </span>
      <span>{time.toLocaleDateString('vi-VN')}</span>
    </div>
  );
}

export default Clock;