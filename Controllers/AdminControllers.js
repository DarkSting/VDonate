const { authenticateUser, createToken } = require('../Middlewares/authMiddleware');
const {AdminModel} = require('../Models/AdminModel');
const { UserModel } = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const {sendmailInternal} = require('./MailControllers');
const jwt = require('jsonwebtoken');


//check the the admin login
const welcomeAdmin = (req,res)=>{
    
    const token = req.cookies.jwt;

    console.log(token);

    if(token){
 
     jwt.verify(token,process.env.SECRET,(err,decoded)=>{
 
         if(err){
             console.log(err.message);
             res.status(500).json("invalid token");
         }
         else{
      
              AdminModel.findOne({_id:decoded.id}).then(r=>{
                return res.status(200).json({name:r.userName});
                
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

//adding a user model to the database
const addAdmin = async(req,res)=>{
    const{
        name,
        age,
        nic,
        gender,
        email,
        phone,
        bloodType,
        photo,
        licenseNumber,
        role

    } = req.body

    if(!name ||
        !age||
        !nic||
        !email ||
        !phone ||
        !licenseNumber){

            return res.status(500).json({msg:"provide necessary details"})
        }

   try{

    var newAdmin = new AdminModel({
        userName:name,
        email:email,
        phone:phone,
        age:age,
        nic:nic,
        licenseNumber:licenseNumber,
        role:role

 
    })

    const result = await newAdmin.save()
    return res.status(201).json(result);

   }
   catch(error){
    return res.status(500).json({msg:error.message});
   }
    

}

/**GET
 * 
 * loggin Admin
 */
const loginAdmin = async(req,res)=>{

    const{licenseNumber,password} = req.body;

    try{

        const user = await AdminModel.login(licenseNumber,password);

        
        if(user){
            if(user.isActive){
                const token = createToken(user._id);
                res.cookie('jwt',token,{httpOnly:true});
                return res.status(200).json(user);
            }
            else{
                return res.status(500).json({msg:"please complete the registration process"});
            }
            
        }

    }catch(error){

        return res.status(500).json(error);

    }

}

const updatePassword = async(req,res)=>{

    const{password,usermail} = req.body;

    //check whether the mail is provided 
    if(!usermail){
        res.status(404).json({msg:"please provide the mail"})
    }

    //preparing the mail components
    const subject = "Request approved";
    const title = "Your new password";
    let intro = "";
    const buttontxt = "";
    const instructions = "Thank you for joining with us";


    //hashing the password
    const salt = await bcrypt.genSalt();
   
    let newpass = "";

    function generatePass() {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789@#$';
 
    for (let i = 1; i <= 5; i++) {
        let char = Math.floor(Math.random()
            * str.length + 1);
 
        pass += str.charAt(char)
        }
        return pass;
    }

    const foundUser = await AdminModel.findOne({email:usermail});


    console.log(foundUser);

    //check whether the user is available
    if(foundUser){

        //check whether the user is provided the password if not generate the password automatically
        if(!password){

            let userpass = generatePass();
            newpass = await bcrypt.hash(userpass, salt);
    
            console.log(userpass)
            intro = `<p>your new password is <b>${userpass}</b></p>`

            //sending the mail
            const mailsent = sendmailInternal(usermail,subject,title,intro,buttontxt,instructions);
    
            //check whether mail is sent or not 
            if(mailsent){

                console.log("mail sent")
                await AdminModel.findOneAndUpdate({email:usermail},{password:newpass}).then(r=>{

                    return res.status(200).json({msg:"password updated"});
    
                }).catch(error=>{
    
                    return res.status(500).json({msg:error.message});
                })
            }
            else{
                return res.status(500).json({msg:"unable to send the mail"})
            }

        }
        else{
            
            newpass = await bcrypt.hash(password, salt);
            await AdminModel.findOneAndUpdate({email:usermail})({password:newpass}).then(r=>{

                return res.status(200).json({msg:"password updated"});

            }).catch(error=>{

                return res.status(500).json({msg:error.message});
            })
        }
    }


}

const getNewlySignedAdmins = async(req,res)=>{

    const foundAdmins = await AdminModel.find({isActive:false});

    if(foundAdmins.length>0){
        return res.status(200).json(foundAdmins);
    }
    else{
        return res.status(500).json(foundAdmins);
    }

}

const getYetToValidateUsers= (req,res)=>{

    UserModel.find({isValidated:false}).then(r=>{

        let array =[];

        r.forEach(value=>{
            let cObj = {}
            cObj.name = value.userName;
            cObj.phone = value.phone;
            cObj.id = value.nic;
            cObj.objectId = value._id;
            array.push(cObj);

        })

        res.status(200).json(array);

    }).catch(err=>{

        res.status(500).json({msg:"no user to find",code:500});
    })

}

//controller that will be invoked after existing admin gives the approve to 
//the new admin
const confirmAdmin = async(req,res)=>{
    const{
        role,
        qualifications,
        yrExp,
        nic,
        phone


    } = req.body;

    await AdminModel.findOneAndUpdate({$or:[{nic:nic},{phone:phone}]},{role:role,qualifications:qualifications
        ,yearOfEXp:yrExp}).then(res=>{
           return res.status(200).json(res);
        }).catch(err=>{
           return res.status(500).json(err);
        })
}

const findAllAdmins = async(req,res,next)=>{

    await AdminModel.find({}).then(result=>{
       return res.status(201).json(result);
    }).catch(error=>{
       return res.status(500).json(error)
    });


}

const findAdmin = async(req,res)=>{

    const{
        name,
        nic,
        phone
 
    } = req.body


   await AdminModel.findOne({$or:[{name:name},{nic:nic},{phone:phone}]}).then(result=>{
    return res.status(201).json(result);
   }).catch(error=>{

    return res.status(500).json(error);
   });

}



const updateAdmin = async(req,res,next)=>{

      const{  name,
        updatedName,
        nic,
        gender,
        updatedEmail,
        updatedPhoneNumber,
        phone,
        updateValidate,
        bloodType,
        role,
        updatedRole,
    } = req.body;

        const errors = [];

        if(updatedName!==undefined){
            console.log(updatedName)
            await AdminModel.findOneAndUpdate({$or:[{userName:name},{nic:nic},{phone:phone}]},{userName:updatedName}).then(result=>{
                console.log(result)
            }).catch(
                err =>{
                    errors.push("invalid name")
                }
            )
        }
        if(updatedEmail!==undefined){
            await AdminModel.findOneAndUpdate({$or:[{userName:name},{nic:nic},{phone:phone}]},{email:updatedEmail}).then(result=>{
                
            }).catch(
                err =>{
                    errors.push("invalid email")
                }
            )
        }
        if(updatedPhoneNumber!==undefined){
            await AdminModel.findOneAndUpdate({$or:[{userName:name},{nic:nic},{phone:phone}]},{phone:updatedPhoneNumber}).then(result=>{
                
            }).catch(
                err =>{
                    errors.push("invalid phone number")
                }
            )
        }

        if(updatedRole!=undefined){
            await AdminModel.findOneAndUpdate({$or:[{userName:name},{nic:nic},{phone:phone}]},{role:role}).then(result=>{
                
            }).catch(
                err =>{
                    errors.push("invalid phone number")
                }
            )
        }

        if(updateValidate!==undefined){
            await AdminModel.findOneAndUpdate({$or:[{userName:name},{nic:nic},{phone:phone}]},{role:updateValidate}).then(result=>{
                console.log(result);
            }).catch(
                err =>{
                    errors.push("invalid input")
                }
            )
        }

        if(errors.length==4){
            return res.status(500).json(errors);
        }

        return res.status(201).json(errors);
        
        
}



module.exports  = {
    
    addAdmin,
    updateAdmin,
    findAllAdmins,
    findAdmin,
    confirmAdmin,
    getYetToValidateUsers,
    loginAdmin,
    updatePassword,
    welcomeAdmin,
    getNewlySignedAdmins

};

