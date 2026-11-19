import React, { Component } from 'react';

const CATEGORIES = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      amount: '',
      category: 'Ăn uống',
      date: new Date().toISOString().split('T')[0],
      error: ''
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, error: '' });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, amount, category, date } = this.state;

    if (!title.trim()) {
      this.setState({ error: 'Vui lòng nhập nội dung khoản chi.' });
      return;
    }

    const parsedAmount = Number(amount);
    if (!amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      this.setState({ error: 'Số tiền phải là số lớn hơn 0.' });
      return;
    }

    if (!CATEGORIES.includes(category)) {
      this.setState({ error: 'Vui lòng chọn loại chi tiêu hợp lệ.' });
      return;
    }

    if (!date) {
      this.setState({ error: 'Vui lòng chọn ngày chi.' });
      return;
    }

    this.props.onAddExpense({
      id: Date.now(),
      title: title.trim(),
      amount: parsedAmount,
      category,
      date
    });

    this.setState({
      title: '',
      amount: '',
      category: 'Ăn uống',
      date: new Date().toISOString().split('T')[0],
      error: ''
    });
  };

  render() {
    const { title, amount, category, date, error } = this.state;

    return (
      <form className="expense-form" onSubmit={this.handleSubmit}>
        <h2>Thêm khoản chi mới</h2>
        {error && <p className="error-text">{error}</p>}
        <div className="form-grid">
          <input
            type="text"
            name="title"
            placeholder="Nội dung chi tiêu..."
            value={title}
            onChange={this.handleChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Số tiền (VNĐ)"
            value={amount}
            onChange={this.handleChange}
          />
          <select name="category" value={category} onChange={this.handleChange}>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            value={date}
            onChange={this.handleChange}
          />
          <button type="submit" className="btn-primary">
            Thêm
          </button>
        </div>
      </form>
    );
  }
}

export default ExpenseForm;