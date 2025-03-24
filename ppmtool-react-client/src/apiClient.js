import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001', // Replace with your proxy URL
    headers: {
        'Content-Type': 'application/json',
    },
});

console.log(process.env.REACT_APP_API_URL)


export default apiClient;