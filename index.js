const express = require('express');
const mongoose =require('mongoose');
const cors = require('cors');
const UserRoutes = require('./Routes/UserRoutes.js');
const AdminRoutes = require('./Routes/AdminRoutes.js');
const ComplainRoutes = require('./Routes/ComplainRoutes.js');
const CampaignRoutes = require('./Routes/CampaignRoutes.js');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

//app configuration
const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/user',UserRoutes)
app.get('/remove-cookie', (req, res) => {
    res.cookie('jwt','',{maxAge:1});
    res.sendStatus(200);
  });
app.use('/admin',AdminRoutes);
app.use('/complain',ComplainRoutes)
app.get('/getCookie',(req,res)=>{
    
    
   
    res.cookie('jwt',false);
    res.status(200).json("you got cookies")
   
})




//database connection
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(res=>console.log("DB connected"))
.catch(err=>console.log(err));


//runs the application
app.listen(8000,()=>console.log("server is running"));

module.exports = {app};



