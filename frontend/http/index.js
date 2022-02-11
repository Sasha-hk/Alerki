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
        console.log('catch error')
        if (error.response.status == 401 && Cookies.get('authenticated')) {
            originalRequest._isRetry = true;
            console.log('handle error')
            const response = await axios.get(`${API_URL}/auth/refresh`, {withCredentials: true})


            return api.request(originalRequest);
        }
        return Promise.reject(error)
    }
)


export default api
