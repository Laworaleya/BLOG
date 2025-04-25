import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ApiData {
  id: number;
  name: string;
}

const FakeApiPage: React.FC = () => {
  const [data, setData] = useState<ApiData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=10`);
      setData(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке данных', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1); // Загрузка первой страницы по умолчанию
  }, []);

  return (
    <div>
      <h1>Данные из Fake API</h1>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FakeApiPage;