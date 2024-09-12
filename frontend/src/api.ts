import axios from 'axios';

// Create an Axios instance with default configurations, including base URL and headers, to make API requests from a centralized location

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;