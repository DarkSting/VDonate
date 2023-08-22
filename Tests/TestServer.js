const express = require('express');
const cors = require('cors');
const UserRoutes = require('../Routes/UserRoutes.js');
const AdminRoutes = require('../Routes/AdminRoutes.js');
const dotenv = require('dotenv');

dotenv.config();

//app configuration
const app = express();
app.use(cors());
app.use(express.json());
app.use('/user',UserRoutes)
app.use('/admin',AdminRoutes);




//runs the application
app.listen(8000,()=>console.log("server is running"));

module.exports = app;