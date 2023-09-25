import axios from 'axios';


const nameaxios = axios.create({
    baseURL:'http://localhost:8080',
    headers: {
        'Content-Type':'application/json',
      },
      withCredentials:true
})

export default nameaxios;