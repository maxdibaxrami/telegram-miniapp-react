import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',  // Replace with your API base URL
  timeout: 10000,                      // Set a timeout for requests
});

export default axiosInstance;