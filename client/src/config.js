
import axios from 'axios'


export const axiosInstance = axios.create({
    baseURL : 'https://inspireverse-73dceddfcb2e.herokuapp.com/api'
})