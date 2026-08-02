import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'http://localhost:5000', // পরবর্তীতে আপনার Vercel/Render backend URL দিবেন
});

export default axiosPublic;