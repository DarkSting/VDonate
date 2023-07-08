const {UserModel} = require('../Models/UserModel');
const jwt = require('jsonwebtoken');



const maxAge = 24*60*60;

const crateToken = (id)=>{

    return jwt.sign({id},process.env.SECRET,{expiresIn:maxAge});
}

//adding a user model to the database
const addUser = async(req,res)=>{
    const{
        name,
        age,
        nic,
        gender,
        email,
        phoneNumber,
        bloodType,
        password
    
    } = req.body

    console.log(email)
    console.log(nic)
    console.log(name)
    console.log(phoneNumber)
   try{

    var newUser = new UserModel({
        userName:name,
        email:email,
        phone:phoneNumber,
        gender:gender,
        bloodType:bloodType,
        age:age,
        nic:nic,
        password:password
        
        
    })

    const result = await newUser.save()
    const token = crateToken(result._id);
    res.cookie('jwt',token,{httpOnly:true});
    return res.status(201).json(token);

   }
   catch(error){
    return res.status(500).json(error);
   }

   
}

//login user
const loginUser = async(req,res)=>{
    const {email,password} = req.body;

    
    try{
        const user = await UserModel.login(email,password);
        return res.status(200).json({user:user._id});
    }
    catch(err){
       return res.status(500).json(err.message);
    }
    
}

const findAllUsers = async(req,res,next)=>{

    await UserModel.find({}).then(result=>{
       return res.status(201).json(result);
    }).catch(error=>{
       return res.status(500).json(error)
    });


}

const findUser = async(req,res,next)=>{

    const{
        name,
        nic,
        phoneNumber
 
    } = req.body


   await UserModel.findOne({$or:[{userName:name},{nic:nic},{phone:phoneNumber}]}).then(result=>{
    return res.status(201).json(result);
   }).catch(error=>{

    return res.status(500).json(error);
   });

}

const testfunc = async(req,res,next)=>{

    next();
}

const updateUser = async(req,res,next)=>{

      const{  name,
        updatedName,
        nic,
        gender,
        updatedEmail,
        updatedPhoneNumber,
        phoneNumber,
        bloodType,} = req.body;

        const errors = [];

        if(updatedName!==undefined){
            await UserModel.findOneAndUpdate({$or:[{userName:name},{nic:nic},{phone:phoneNumber}]},{name:updatedName}).then(result=>{
                
            }).catch(
                err =>{
                    errors.push("invalid name")
                }
            )
        }
        if(updatedEmail!==undefined){
            await UserModel.findOneAndUpdate({$or:[{userName:name},{nic:nic},{phone:phoneNumber}]},{email:updatedEmail}).then(result=>{
                
            }).catch(
                err =>{
                    errors.push("invalid email")
                }
            )
        }
        if(phoneNumber!==undefined){
            await UserModel.findOneAndUpdate({$or:[{userName:name},{nic:nic},{phone:phoneNumber}]},{phone:updatedPhoneNumber}).then(result=>{
                
            }).catch(
                err =>{
                    errors.push("invalid phone number")
                }
            )
        }

        if(errors.length==3){
            return res.status(500).json(errors);
        }

        return res.status(201).json(errors);
        
        
}

const validateUser = async(req,res)=>{

    const{ name,password} = req.body

   let result = await UserModel.findOne({$and:[{userName:name},{password:password}]});

   if(result !=null){
    res.status(200).json(result.userName);

   }
   else{
    res.status(450).json("user not found");
   }

}

const getUser = async(req,res)=>{

    
    const{ name,password} = req.body

   let result = await UserModel.findOne({$or:[{userName:name},{password:password}]});

   if(result !=null){
    res.status(200).json(result);

   }
   else{
    res.status(450).json("user not found");
   }

}

module.exports  = {
    
    addUser,
    updateUser,
    findAllUsers,
    findUser,
    validateUser,
    getUser,
    loginUser

};

