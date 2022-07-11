import axios, { AxiosInstance } from 'axios'


const axiosInstance : AxiosInstance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_BASE_URL,
    //baseURL:'https://api.escuelajs.co/api/v1',
    
})

export default axiosInstance