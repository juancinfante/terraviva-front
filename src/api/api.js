import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://terraviva-back.vercel.app',
    baseURL: 'http://localhost:4001',
})


export default api;