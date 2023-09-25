import axios from 'axios';


const fileaxios = axios.create({
    baseURL:'http://localhost:8080',
    headers: {
        'Content-Type':'multipart/form-data',
      },

})

export default fileaxios;