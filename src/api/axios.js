import axios from 'axios';

const PORT = process.env.BACKEND_SERVER_PORT;

const Axios = axios.create({
    baseURL:'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json', // Set the request content type to JSON
      },
      withCredentials: true
})

export default Axios;