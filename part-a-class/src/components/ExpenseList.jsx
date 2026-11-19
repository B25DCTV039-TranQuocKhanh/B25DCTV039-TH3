import React, { Component } from 'react';

class ExpenseList extends Component {
  handleDelete = (id, title) => {
    const confirmed = window.confirm(`Bạn có chắc chắn muốn xóa khoản chi "${title}"?`);
    if (confirmed) {
      this.props.onDeleteExpense(id);
    }
  };

  render() {
    const { expenses } = this.props;
    const totalAmount = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

    return (
      <div className="table-wrapper">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Nội dung</th>
              <th>Loại</th>
              <th>Ngày chi</th>
              <th>Số tiền</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-row">
                  Không có khoản chi nào phù hợp.
                </td>
              </tr>
            ) : (
              expenses.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>
                    <span className="badge">{item.category}</span>
                  </td>
                  <td>{item.date}</td>
                  <td className="amount-cell">
                    {Number(item.amount).toLocaleString('vi-VN')} đ
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn-danger"
                      onClick={() => this.handleDelete(item.id, item.title)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr className="total-row">
              <td colSpan="3">Tổng tiền hiển thị</td>
              <td colSpan="2" className="amount-cell">
                {totalAmount.toLocaleString('vi-VN')} đ
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default ExpenseList;