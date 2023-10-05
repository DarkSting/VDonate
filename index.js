const fs = require('fs');
const express = require('express');
const path = require('path');
const multer = require('multer');
const port = 8080;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { fileModel } = require('./Models/FileModel');

dotenv.config();
const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

//stores the current file's name which is being uploaded
let _filename =  "test";
let _userName = "testname";

//app.use('/uploads',express.static('uploads'))

//setting up the file engine
const storage = multer.diskStorage({

    
    destination: (req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename: (req, file, cb) => {
       
      const customFilename = _filename ||'folder';
      req.body.customeFilenName = customFilename+path.extname(file.originalname);
      console.log(customFilename + path.extname(file.originalname));
      cb(null, customFilename + path.extname(file.originalname));
    },

})


//setting up the file type filter
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
      req.body.mime = file.mimetype
      cb(null, true);
    } else {
      cb(new Error('Only images (JPEG/PNG) and PDF files are allowed'), false);
    }
  };


  //configure the multer
const upload = multer({storage:storage,fileFilter:fileFilter});


//endpoints
//upload
app.post('/upload', upload.single('file'),(req, res) => {

    const newFile = new fileModel({

      fileName:req.body.customeFilenName,
      userName: _userName
      ,
      mimeType:req.body.mime

    })

    
    //saves the model
    newFile.save().then(r=>{
      return res.status(200).json({ message: 'File uploaded successfully'});

    }).catch(error=>{
      return res.status(500).json({ message: error.message});

    })

    console.log(_filename);

    
  });


  //storing the file name
app.post('/sendfilename',(req, res) => {

    const{filename,userid} = req.body;

    if(!userid){
      return res.status(500).json({msg:"please insert a user to upload the file"})
    }

    if(filename.trim().length>0){
      const time = new Date();
      time.setMilliseconds(0);
      time.setSeconds(0);
      const tempTime = time.toLocaleDateString();
      const splittedAray = tempTime.split("/");

      let convertedString = "";

      for(let current of splittedAray){

        convertedString = convertedString+`${current}-`;


      }

      _userName = userid;

      _filename = filename.replace(/\s+/g, "")+"@"+`${userid}`+"@"+convertedString.substring(0,convertedString.length-1);
      console.log(userid);
        return res.status(200).json({msg:"send the file"})

    }
    return res.status(500).json({ message: 'please provide the filename', filename: req.body.filename });

  })


    //download files from the server
  app.get('/download/:filename', (req, res) => {

    console.log("downloading");

    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);
  
    res.download(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('File download failed');
      }
    });

  });
  

  //send the list files available to the user
app.get('/getfiles/:name',async(req,res)=>{

    try{


        console.log(req.params.name)
        let filesfound = []
        if( req.params.name !=='all'){
          const username = req.params.name;
        const filesfound = await fileModel.find({$and:[{userName:username},{checked:false}]})
        if (filesfound.length === 0) {
          return res.status(404).json({ error: 'User not found or no files available.' });
        }
       
        
        return res.status(200).json(filesfound);
      }
      else{
        const filesfound = await fileModel.find({checked:false})
        if (filesfound.length === 0) {
          return res.status(404).json({ error: 'User not found or no files available.' });
        }

        return res.status(200).json(filesfound);
      }
  
     
    }catch(error){
      return res.status(500).json({msg:"file loading failed"});
    }

})

app.post('/checkfile',async(req,res)=>{

  const{username,filename} = req.query;

  console.log("checking file")

  try{      
    
    await fileModel.findOneAndUpdate({$and:[{userName:username},{fileName:filename}]},{$set:{checked:true}})
  

    return res.status(200).json({msg:"fileupdated"});
  
 
}catch(error){

  return res.status(500).json({msg:"file updating failed"});
}


  
})

app.get('/getcheckedfiles/:name',async(req,res)=>{


  console.log('getting checked files')
  try{
 
    let filesfound = []

    if( req.params?.name!=='all'){
      const username = req.params.name;
    const filesfound = await fileModel.find({$and:[{userName:username},{checked:true}]})
    if (filesfound.length === 0) {
      return res.status(404).json({ error: 'User not found or no files available.' });
    }
   
    
    return res.status(200).json(filesfound);
  }
  else{
    const filesfound = await fileModel.find({checked:true})
    if (filesfound.length === 0) {
      return res.status(404).json({ error: 'User not found or no files available.' });
    }

    return res.status(200).json(filesfound);
  }

 
}catch(error){
  return res.status(500).json({msg:"file loading failed"});
}


})

mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(res=>{console.log("DB connected")

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

})
.catch(err=>console.log(err));
  
 