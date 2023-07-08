const jwt = require('jsonwebtoken');


const authenticateUser = (req,res,next)=>{

   const token = req.cookies.jwt;

   if(token){

    jwt.verify(token,process.env.SECRET,(err,decoded)=>{

        if(err){
            console.log(err.message);
            res.status(500).json("invalid token");
        }
        else{
            console.log(decoded);
            next();
        }

    })

   }

}


module.exports = {authenticateUser}