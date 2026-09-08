import axios from 'axios';

// Backend server URL (jo humara port 5000 par chal raha hai)
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Agar localStorage mein token hua toh har request ke sath bhejeyga
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;