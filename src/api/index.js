import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000'
    // baseURL: 'http://123.60.41.109:8080'
})

api.interceptors.response.use(
    response=>{
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

export default api