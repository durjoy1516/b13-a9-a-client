import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://b13-a9-server-exbtz0gy4-durjoy1516s-projects.vercel.app',
});

export default axiosPublic;