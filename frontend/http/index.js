import axios from 'axios'
import Cookies from 'js-cookie'


const API_URL = process.env.API_URL

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status == 401 && Cookies.get('authenticated')) {
            originalRequest._isRetry = true;
            
            const response = await axios.get(`${API_URL}/authe/refresh`, {withCredentials: true})
            return api.request(originalRequest);
        }
    }
)


export default api
