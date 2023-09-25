const jwt = require('jsonwebtoken');


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


const authenticateUserMiddleware = (req,res,next)=>{

    const token = req.cookies.jwt;

    console.log(req.cookies);

    if(token){
 
     jwt.verify(token,process.env.SECRET,(err,decoded)=>{
 
         if(err){
             console.log(err.message);
             res.status(500).json("invalid token");
         }
         else{
                req.body.userid = decoded.id;
                next();
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


module.exports = {authenticateUser,createToken,authenticateUserMiddleware}