import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://terraviva-back.vercel.app/',
    // baseURL: 'http://localhost:4001/',
    // baseURL: 'https://terraviva-back-sybt-juancinfante-juancinfantes-projects.vercel.app/',
    // baseURL: 'https://terraviva-api.onrender.com/',
    baseURL: 'https://terraviva-api-new.vercel.app/',
    
})


export default api;