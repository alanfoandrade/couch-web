import axios from 'axios';

const api = axios.create({
  baseURL: 'https://couchapi.alandev.life',
});

export default api;
