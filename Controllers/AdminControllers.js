const {AdminModel} = require('../Models/AdminModel');


//adding a user model to the database
const addAdmin = async(req,res)=>{
    const{
        name,
        age,
        nic,
        gender,
        email,
        phoneNumber,
        bloodType,
        photo
    } = req.body

   try{

    var newAdmin = new AdminModel({
        userName:name,
        email:email,
        phone:phoneNumber,
        gender:gender,
        bloodType:bloodType,
        age:age,
        nic:nic,
        photo:photo,

        
        
    })

    const result = await newAdmin.save()
    return res.status(201).json(result);

   }
   catch(error){
    return res.status(500).json(error);
   }
    
    

}

//controller that will be invoked after existing admin gives the approve to 
//the new admin
const confirmAdmin = async(req,res)=>{
    const{
        role,
        qualifications,
        yrExp,
        nic,
        phoneNumber


    } = req.body;

    await AdminModel.findOneAndUpdate({$or:[{nic:nic},{phone:phoneNumber}]},{role:role,qualifications:qualifications
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
        phoneNumber
 
    } = req.body


   await AdminModel.findOne({$or:[{name:name},{nic:nic},{phone:phoneNumber}]}).then(result=>{
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
        phoneNumber,
        updateValidate,
        bloodType,
        role,
        updatedRole,
    } = req.body;

        const errors = [];

        if(updatedName!==undefined){
            console.log(updatedName)
            await AdminModel.findOneAndUpdate({$or:[{userName:name},{nic:nic},{phone:phoneNumber}]},{userName:updatedName}).then(result=>{
                console.log(result)
            }).catch(
                err =>{
                    errors.push("invalid name")
                }
            )
        }
        if(updatedEmail!==undefined){
            await AdminModel.findOneAndUpdate({$or:[{userName:name},{nic:nic},{phone:phoneNumber}]},{email:updatedEmail}).then(result=>{
                
            }).catch(
                err =>{
                    errors.push("invalid email")
                }
            )
        }
        if(updatedPhoneNumber!==undefined){
            await AdminModel.findOneAndUpdate({$or:[{userName:name},{nic:nic},{phone:phoneNumber}]},{phone:updatedPhoneNumber}).then(result=>{
                
            }).catch(
                err =>{
                    errors.push("invalid phone number")
                }
            )
        }

        if(updatedRole!=undefined){
            await AdminModel.findOneAndUpdate({$or:[{userName:name},{nic:nic},{phone:phoneNumber}]},{role:role}).then(result=>{
                
            }).catch(
                err =>{
                    errors.push("invalid phone number")
                }
            )
        }

        if(updateValidate!==undefined){
            await AdminModel.findOneAndUpdate({$or:[{userName:name},{nic:nic},{phone:phoneNumber}]},{role:updateValidate}).then(result=>{
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
    confirmAdmin

};

