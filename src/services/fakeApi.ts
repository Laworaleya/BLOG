import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Функция для получения данных с пагинацией
export const fetchFakeApiData = async (page: number, limit: number = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      params: { _page: page, _limit: limit },
    });
    return response.data; // Возвращаем массив данных
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    throw error;
  }
};

// Функция для загрузки конкретного пользователя (если потребуется)
export const fetchFakeApiUser = async (userId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}`);
    return response.data; // Возвращаем данные пользователя
  } catch (error) {
    console.error('Ошибка при загрузке пользователя:', error);
    throw error;
  }
};