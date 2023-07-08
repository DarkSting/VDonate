const {DonationModel} = require('../Models/DonationModel');


//adding a user model to the database
const addDonation = async(req,res)=>{
    const{
       
        location,
        donationType,
        Donor,
        timeTakenForProcess,
        isValidated,
        bloodType,
        collectedAt,
        refNo
    
    } = req.body


   try{

    var newDonation = new DonationModel({
        location:location,
        timeTakenForProcess:timeTakenForProcess,
        Donor:Donor,
        isValidated:isValidated,
        donationType:donationType,
        collectedAt:collectedAt,
        bloodType:bloodType,
        refNo:refNo  
    })

    const result = await newDonation.save()
    return res.status(201).json(result);

   }
   catch(error){
    
    return res.status(500).json(error);

   }
    
    

}

const findAllDonations = async(req,res,next)=>{

    await DonationModel.find({}).then(result=>{
      
        return res.status(201).json(result);

    }).atch(error=>{
       
        return res.status(500).json(error);
        
    });


}

const findDonation = async(req,res,next)=>{

    const{
        Date,
        refNo
 
    } = req.body


   await DonationModel.findOne({$or:[{collectedAt:Date},{refNo:refNo}]}).then(result=>{
    return res.status(201).json(result);
   }).catch(error=>{

    return res.status(500).json(error);
   });

}

const updateDonation = async(req,res,next)=>{

      const{ 
        refNo,
        updatedDonor,
        updatedStaff,
        updatedBloodType,
        updatedTimeTakenForProcess
    
    } = req.body;

        const errors = [];

        if(updatedBloodType!==undefined){
            await DonationModel.findOneAndUpdate({refNo:refNo},{bloodType:updatedBloodType}).then(result=>{
                
            }).catch(
                err =>{
                    errors.push("invalid Blood Type");
                }
            )
        }
        if(updatedDonor!==undefined){
            await DonationModel.findOneAndUpdate({refNo:refNo},{Donor:updatedDonor}).then(result=>{
                
            }).catch(
                err =>{
                    errors.push("invalid donor referencing");
                }
            )
        }
        if(updatedStaff!==undefined){
            await DonationModel.findOneAndUpdate({refNo:refNo},{Staff:updatedStaff}).then(result=>{
                
            }).catch(
                err =>{
                    errors.push("invalid staff referencing");
                }
            )
        }

        if(updatedTimeTakenForProcess!==undefined){
            await DonationModel.findOneAndUpdate({refNo:refNo},{timeTakenForProcess:updatedTimeTakenForProcess}).then(result=>{
                
            }).catch(
                err =>{
                    errors.push("invalid type");
                }
            )
        }
        if(errors.length==3){
            return res.status(500).json(errors);
        }

        return res.status(201).json(errors);
       
}

module.exports  = {
    
    addDonation,
    updateDonation,
    findAllDonations,
    findDonation

};

