import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://lit-blog.herokuapp.com/api/v1',
});

export default axiosInstance;
