import React, { useState, useRef } from 'react';

const CATEGORIES = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

function ExpenseForm({ onAddExpense, loading }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Ăn uống');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  const titleInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Vui lòng nhập nội dung khoản chi.');
      titleInputRef.current?.focus();
      return;
    }

    const parsedAmount = Number(amount);
    if (!amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Số tiền phải là số lớn hơn 0.');
      return;
    }

    if (!CATEGORIES.includes(category)) {
      setError('Vui lòng chọn loại chi tiêu hợp lệ.');
      return;
    }

    if (!date) {
      setError('Vui lòng chọn ngày chi.');
      return;
    }

    const success = await onAddExpense({
      title: title.trim(),
      amount: parsedAmount,
      category,
      date
    });

    if (success) {
      setTitle('');
      setAmount('');
      setCategory('Ăn uống');
      setDate(new Date().toISOString().split('T')[0]);
      setError('');
      titleInputRef.current?.focus();
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Thêm khoản chi mới</h2>
      {error && <p className="error-text">{error}</p>}
      <div className="form-grid">
        <input
          ref={titleInputRef}
          type="text"
          placeholder="Nội dung chi tiêu..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError('');
          }}
        />
        <input
          type="number"
          placeholder="Số tiền (VNĐ)"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setError('');
          }}
        />
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setError('');
          }}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setError('');
          }}
        />
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Đang lưu...' : 'Thêm'}
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;