import { useState, useEffect, useCallback } from 'react';

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Không thể tải danh sách khoản chi.');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || 'Đã xảy ra lỗi kết nối.');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const postData = async (newItem) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      if (!response.ok) {
        throw new Error('Không thể thêm khoản chi mới.');
      }
      const createdItem = await response.json();
      setData((prev) => [createdItem, ...prev]);
      return true;
    } catch (err) {
      setError(err.message || 'Lỗi khi thêm dữ liệu.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Không thể xóa khoản chi.');
      }
      setData((prev) => prev.filter((item) => item.id !== id));
      return true;
    } catch (err) {
      setError(err.message || 'Lỗi khi xóa dữ liệu.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData, deleteData };
}