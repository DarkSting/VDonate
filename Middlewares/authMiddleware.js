const jwt = require('jsonwebtoken');
const { AdminModel } = require('../Models/AdminModel');


const authenticateUser = (req)=>{

   const token = req.cookies.jwt;

   if(token){

    jwt.verify(token,process.env.SECRET,(err,decoded)=>{

        if(err){
            console.log(err.message);
            return false;
        }
        else{
            console.log(decoded);
            return true;
        }

    })

   }


}


const authenticateAdminMiddleware = (req,res,next)=>{

    const token = req.cookies.jwt;

    if(token){
 
     jwt.verify(token,process.env.SECRET,(err,decoded)=>{
 
         if(err){
             console.log(err.message);
             res.status(500).json("invalid token");
         }
         else{
      
               AdminModel.findOne({_id:decoded.id}).then(r=>{
                req.body.user = r;
                next();
  
             }).catch(er=>{
                return res.status(404).json({msg:"user not found",code:500});
             })
             
         }
 
     })
 
    }
    else{
        return res.status(404).json({msg:"token not found",code:500});
    }
 
 
 }

const maxAge = 2*60*60

const createToken = (id)=>{

    return jwt.sign({id},process.env.SECRET,{expiresIn:maxAge})

}


module.exports = {authenticateUser,createToken,authenticateAdminMiddleware}