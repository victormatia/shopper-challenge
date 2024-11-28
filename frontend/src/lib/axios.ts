import axios from 'axios';

const axiosCustomInstance = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: 'http://localhost:8080',
});

export default axiosCustomInstance;
