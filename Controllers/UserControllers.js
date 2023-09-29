const  mongoose = require('mongoose');
const { DonationRequestModel } = require('../Models/DonationRequestModel');
const {UserModel} = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const { DonationModel } = require('../Models/DonationModel');
const { ComplainModel } = require('../Models/ComplainModel');
const {resolver} = require('../Middlewares/IPResolver');
const { updatePasswordUser } = require('./AdminControllers');
const { CampaignModel } = require('../Models/CampaignModel');
const BloodBagModel = require('../Models/BloodBagModel');


//set the living time of the cookie which will be set in the login
const maxAge = 2*60*60;

/*GET
authenticate user
*/
const welcomeUser = (req,res)=>{
    
    const token = req.cookies.jwt;

    if(token){
 
     jwt.verify(token,process.env.SECRET,(err,decoded)=>{
 
         if(err){
             console.log(err.message);
             res.status(500).json("invalid token");
         }
         else{
      
              UserModel.findOne({_id:decoded.id}).then(r=>{
                res.status(200).json({name:r.userName});
               
             }).catch(er=>{
                res.status(404).json({msg:"user not found",code:500});
             })
             
         }
 
     })
 
    }
    else{
        res.status(404).json({msg:"token not found",code:500});
    }
   
}

const updateUserApproval = async(req,res)=>{

    const{approval,objectId} = req.body;

    UserModel.updateOne({_id:objectId},{isValidated:approval}).then(r=>{

        console.log(r);
  
       

    }).catch(err=>{
       return res.status(500).json({msg:"user cannot approved",code:500});
    })

    const status = await updatePasswordUser(objectId);

    console.log(status);
    if(status){
        return res.status(200).json({msg:"password is updated"});
    }
    else{
        return res.status(500).json({msg:"couldnt update the password"});
    }

}

//get assigned campaign
const getCampaigns = async(req,res)=>{

    const{name} = req.query;

    const foundUser = await UserModel.findOne({userName:name})

    console.log(foundUser);

    async function searchAndExtractDocument(searchValue) {
        try {
     
          const document = await CampaignModel.findOne({ donors:new mongoose.Types.ObjectId(searchValue) });
      
          if (document) {

            console.log('Document found:', document);
            return document;
          } else {
            console.log('Document not found');
            return null; 
        }
        } catch (error) {
          console.error('Error searching for document:', error);
          throw error; 
        }
      }

      try{

        const document = await searchAndExtractDocument(foundUser._id);
        return res.status(200).json({msg:document});

      }catch(error){

        return res.status(200).json({})

      }



}


const crateToken = (id)=>{

    return jwt.sign({id},process.env.SECRET,{expiresIn:maxAge});
}

/*POST
adds a users to the database
*/
const addUser = async(req,res)=>{
    const{
        name,
        age,
        nic,
        gender,
        email,
        phone,
        bloodType,
        password,
        latitude,
        longitude

    
    } = req.body


   try{

    var newUser = new UserModel({
        userName:name,
        email:email,
        phone:phone,
        gender:gender,
        bloodType:bloodType,
        age:age,
        nic:nic,
        password:password,

        location:{
            latitude:latitude,
            longitude:longitude

        }
        
    })

    const result = await newUser.save()
    const token = crateToken(result._id);
    res.cookie('jwt',token,{httpOnly:true});
    return res.status(201).json(token);

   }
   catch(error){
    return res.status(500).json({msg:error.message,code:500});
   }

   
}

/**
 GET
 gets the current user blood bag
 */
const getBloodBag = async(req,res)=>{

const{name} = req.query;

const user = await UserModel.findOne({userName:name});

console.log('getting user bloodbag')

const foundBloodBag = await BloodBagModel.findOne({$and:[{donor:user._id},{filled:false}]})

if(foundBloodBag){

    return res.status(200).json({foundBloodBag});
}
else{

    return res.status(500).json({msg:"no blood bags available"});
}


}

/*GET
logges in a user if the user exists
*/
const loginUser = async(req,res)=>{
    const {email,password} = req.body;

    console.log(await resolver(req.ip));
    console.log(password);


    try{
        const user = await UserModel.login(email,password);
       
        if(user){
            const token = crateToken(user._id);
            console.log(token);
            res.cookie('jwt',token,{httpOnly:true})
            res.status(200).json({user:user._id});
        }
        else{
            return res.status(500).json({msg:"user not found",code:200});
        }
        
        
    }
    catch(err){
       return res.status(500).json({msg:err.message,code:500});
    }
    
}


/*GET
findUsers
*/
const findAllUsers = async(req,res,next)=>{

    await UserModel.find({}).then(result=>{
       return res.status(201).json(result);
    }).catch(error=>{
       return res.status(500).json(error)
    });

}

/*POST
making requests by the user and it will be tested by an
admin
*/
const makeRequest =async(req,res)=>{
    
    const{
        DonorID,
        donationType,
    } = req.body

    let id = 0;

   const list = await DonationRequestModel.find({}).sort({refNo:-1});


   if(list.length===0){
    id=1;
   }
   else{
    id= list[0].refNo+1;
   }

   const time = new Date(0);

   console.log(time);

    const newReq = new DonationRequestModel({
        refNo:id,
        donationType:donationType,
        Donor:DonorID,
        approvedDate:time
    })

    newReq.save().then(r=>{
        res.status(200).json({msg:"request has sent",code:200});
    }).catch(er=>{
        res.status(500).json({msg:"model saving error",code:500});
    })

 
}

/**
 * POST
 * making a complain
 */

const makeComplain = async(req,res)=>{

    const{User,description} = req.body;
    const token = req.cookies.jwt;

    let refid =0;


    const list = await ComplainModel.find({}).sort({refNo:-1});
    
    if(list.length===0){
        refidid=1;
    }
    else{
        refid= parseInt(list[0].refNo)+1;
    }
    if(token){
 
     jwt.verify(token,process.env.SECRET,(err,decoded)=>{
 
         if(err){
             console.log(err.message);
             res.status(500).json("invalid token");
         }
         else{
      
              UserModel.findOne({_id:decoded.id}).then(r=>{
                
                const newComplain = new ComplainModel({
                    User:decoded.id,
                    description:description,
                    refNo:refid
                })
                console.log(description);
                
                newComplain.save().then(r=>{
                    res.status(201).json({msg:"complain has made",code:200})
                }).catch(err=>{
                    res.status(500).json({msg:"complain failed to create",code:500})
                })

             }).catch(er=>{
                res.status(404).json({msg:"user not found",code:500});
             })
             
         }
 
     })
 
    }
    else{
        res.status(404).json({msg:"token not found",code:500});
    }
   
}

/*GET
finds a user
*/
const findUser = async(req,res,next)=>{

    const{
        name,
        nic,
        phoneNumber
 
    } = req.body


   await UserModel.findOne({$or:[{userName:name},{nic:nic},{phone:phoneNumber}]}).then(result=>{
    return res.status(201).json({msg:result,code:200});
   }).catch(error=>{

    return res.status(500).json({msg:error.message,code:500});
   });

}


/*PUT
updates a user
*/
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

        if(errors.length>0){
            return res.status(500).json({msg:errors, code:500});
        }

        return res.status(201).json({msg:"no errors",code:200});
        
        
}


module.exports  = {
    
    addUser,
    updateUser,
    findAllUsers,
    findUser,
    makeRequest,
    loginUser,
    welcomeUser,
    makeComplain,
    updateUserApproval,
    getCampaigns,
    getBloodBag

};

