import React, { useState, useEffect, useContext } from 'react';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import { useFetch } from './hooks/useFetch';
import { useDebounce } from './hooks/useDebounce';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import CategoryStats from './components/CategoryStats';
import FilterBar from './components/FilterBar';
import ExpenseList from './components/ExpenseList';
import './App.css';

const API_URL = 'https://6afe857e3a0e70bc8d53903e.mockapi.io/expenses';

function ExpenseApp() {
  const { theme } = useContext(ThemeContext);
  const { data: expenses, loading, error, postData, deleteData } = useFetch(API_URL);

  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');
  const [showClock, setShowClock] = useState(true);

  const debouncedSearch = useDebounce(searchTerm, 400);

  useEffect(() => {
    const totalAll = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    document.title = `Tổng chi: ${totalAll.toLocaleString('vi-VN')} đ`;
  }, [expenses]);

  const filteredExpenses = expenses.filter((item) => {
    const matchesCategory =
      selectedCategory === 'Tất cả' || item.category === selectedCategory;
    const matchesSearch = (item.title || '')
      .toLowerCase()
      .includes(debouncedSearch.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`app-wrapper ${theme}`}>
      <div className="container">
        <Header
          showClock={showClock}
          onToggleClock={() => setShowClock((prev) => !prev)}
        />
        <ExpenseForm onAddExpense={postData} loading={loading} />
        <CategoryStats expenses={expenses} />
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        {loading && <p className="status-banner loading">Đang tải dữ liệu...</p>}
        {error && <p className="status-banner error">{error}</p>}
        <ExpenseList
          expenses={filteredExpenses}
          onDeleteExpense={deleteData}
          loading={loading}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ExpenseApp />
    </ThemeProvider>
  );
}

export default App;