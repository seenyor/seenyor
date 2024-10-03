import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const useApi = () => {
  const post = async (url, data) => {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('An error occurred');
    }
  };
  const get = async (url, params) => {
    try {
      const response = await api.get(url, { params });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('An error occurred');
    }
  };


  return { post, get };
};