import React, { Component } from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import FilterBar from './components/FilterBar';
import ExpenseList from './components/ExpenseList';
import './App.css';

const INITIAL_EXPENSES = [
  { id: 1, title: 'Cơm trưa văn phòng', amount: 45000, category: 'Ăn uống', date: '2026-11-18' },
  { id: 2, title: 'Đổ xăng xe máy', amount: 70000, category: 'Đi lại', date: '2026-11-18' },
  { id: 3, title: 'Mua sách lập trình React', amount: 180000, category: 'Học tập', date: '2026-11-19' },
  { id: 4, title: 'Xem phim cuối tuần', amount: 110000, category: 'Giải trí', date: '2026-11-19' }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: INITIAL_EXPENSES,
      selectedCategory: 'Tất cả',
      showClock: true
    };
  }

  componentDidMount() {
    this.updateDocumentTitle();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.expenses !== this.state.expenses) {
      this.updateDocumentTitle();
    }
  }

  updateDocumentTitle = () => {
    const totalAll = this.state.expenses.reduce((sum, item) => sum + Number(item.amount), 0);
    document.title = `Tổng chi: ${totalAll.toLocaleString('vi-VN')} đ`;
  };

  handleAddExpense = (newExpense) => {
    this.setState((prevState) => ({
      expenses: [newExpense, ...prevState.expenses]
    }));
  };

  handleDeleteExpense = (id) => {
    this.setState((prevState) => ({
      expenses: prevState.expenses.filter((item) => item.id !== id)
    }));
  };

  handleSelectCategory = (category) => {
    this.setState({ selectedCategory: category });
  };

  handleToggleClock = () => {
    this.setState((prevState) => ({ showClock: !prevState.showClock }));
  };

  render() {
    const { expenses, selectedCategory, showClock } = this.state;

    const filteredExpenses =
      selectedCategory === 'Tất cả'
        ? expenses
        : expenses.filter((item) => item.category === selectedCategory);

    return (
      <div className="container">
        <Header showClock={showClock} onToggleClock={this.handleToggleClock} />
        <ExpenseForm onAddExpense={this.handleAddExpense} />
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={this.handleSelectCategory}
        />
        <ExpenseList
          expenses={filteredExpenses}
          onDeleteExpense={this.handleDeleteExpense}
        />
      </div>
    );
  }
}

export default App;