import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://findouttutors.vercel.app',
});

export default axiosPublic;