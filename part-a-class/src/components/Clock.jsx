import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    };
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const { time } = this.state;
    return (
      <div className="clock-box">
        <span>{time.toLocaleTimeString('vi-VN')}</span>
        <span> | </span>
        <span>{time.toLocaleDateString('vi-VN')}</span>
      </div>
    );
  }
}

export default Clock;