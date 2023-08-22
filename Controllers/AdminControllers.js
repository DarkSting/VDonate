const { authenticateUser } = require('../Middlewares/authMiddleware');
const {AdminModel} = require('../Models/AdminModel');
const { UserModel } = require('../Models/UserModel');


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
        licenseNumber

    } = req.body

   try{

    var newAdmin = new AdminModel({
        userName:name,
        email:email,
        phone:phone,
        gender:gender,
        bloodType:bloodType,
        age:age,
        nic:nic,
        photo:photo,
        licenseNumber:licenseNumber

        
        
    })

    const result = await newAdmin.save()
    return res.status(201).json(result);

   }
   catch(error){
    return res.status(500).json(error);
   }
    

}

/**GET
 * 
 * loggin Admin
 */
const loginAdmin = (req,res)=>{

    const{email,password} = req.body;

    AdminModel.find({email:email}).then(r=>{
        if(authenticateUser(r._id)){

            //since this for testing purposes please provide the bcrypt.compare() over here
            if(password===r.password){
                res.status(200).json({msg:"access granted",code:200});
            }
        }
        else{
            res.status(404).json({msg:"user not found",code:500});
        }
    })

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
    getYetToValidateUsers

};

