import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://80.78.242.127:3000',  // Replace with your API base URL
  timeout: 20000,                      // Set a timeout for requests
});

export default axiosInstance;