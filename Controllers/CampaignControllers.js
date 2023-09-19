const {CampaignModel} = require('../Models/CampaignModel');


//adding a user model to the database
const addCampaign = async(req,res)=>{
    
    const{
        location,
        timeBegin,
        staff,
        donors,
        bloodGroup,
    
    } = req.body

    console.log(email);

   try{

    var newCampaign = new CampaignModel({
        location:location,
        timeBegin:timeBegin,
        staff:staff,
        donors:donors,
        bloodGroup:bloodGroup

        
    })
    const result = await newCampaign.save()
    return res.status(201).json(result);

   }
   catch(error){
    return res.status(500).json(error);
   }
    
    

}

const findAllCampaign = async(req,res,next)=>{

    await CampaignModel.find({}).then(result=>{
       return res.status(201).json(result);
    }).atch(error=>{
       return res.status(500).json(error)
    });


}

const findCampaign = async(req,res,next)=>{

    const{
        id,
        name
 
    } = req.body


   await CampaignModel.findOne({$or:[{name:name},{_id:id}]}).then(result=>{
    return res.status(201).json(result);
   }).catch(error=>{

    return res.status(500).json(error);
   });

}

//add donors to the campaign
const findDonorInCampaign = async(req,res,next)=>{

        const {users} = req.body;

        let alreadyUsers = [];

        for(let current of users){

            let founduser = await CampaignModel.findOne({$and:[{donors:{$in:[current]}},{isCompleted:false}]});

            if(founduser){
                alreadyUsers.push(founduser);
            }
            
        }

        if(alreadyUsers.length>0){
            return res.status(500).json({msg:"someuser already in some campaigns", usersFound: alreadyUsers})
        }
        else{
            req.body.donors = users;
            next();
        }
        
}


//removes donors from the campaign
const removeUsersFromCampaign = async(req,res)=>{

    const {users,campaignID} = req.body;

    let removedUsers = [];

        let foundCampaign = await CampaignModel.findOne({_id:campaignID});

        if(foundCampaign){
            
            const currentdonors = foundCampaign.donors;
            let updatedDonors = currentdonors.filter(item=>!users.includes(item));

            CampaignModel.findOneAndUpdate({_id:foundCampaign._id},{donor:updatedDonors}).then(r=>{
                res.status(200).json({updatedList:r.donors});
            }).catch(error=>{
                res.status(500).json(error);
            })

        }
        else{

            return res.status(404).json({msg:"couldnt find provided campaign id"})

        }

}


const updateCampaign = async(req,res,next)=>{

      const{  name,
        updatedBloodGroup,
        id,
        updatedName,
        updatedDonors,
        updatedStaff,
        bloodType,} = req.body;

        const errors = [];

        if(updatedName!==undefined){
            await CampaignModel.findOneAndUpdate({$or:[{name:name},{_id:id}]},{name:updatedName}).then(result=>{
                
            }).catch(
                err =>{
                    errors.push("invalid name")
                }
            )
        }
        if(updatedDonors!==undefined){
            await CampaignModel.findOneAndUpdate({$or:[{name:name},{_id:id}]},{Donors:updatedDonors}).then(result=>{
                
            }).catch(
                err =>{
                    errors.push("invalid donors array input")
                }
            )
        }
        if(updatedStaff!==undefined){
            await CampaignModel.findOneAndUpdate({$or:[{name:name},{_id:id}]},{Donors:updatedStaff}).then(result=>{
                
            }).catch(
                err =>{
                    errors.push("invalid staff array input")
                }
            )
        }

        if(updatedBloodGroup!==undefined){
            await CampaignModel.findOneAndUpdate({$or:[{name:name},{_id:id}]},{bloodGroup:updatedBloodGroup}).then(result=>{
                
            }).catch(
                err =>{
                    errors.push("invalid aray of blood group")
                }
            )
        }
        if(errors.length==3){
            return res.status(500).json(errors);
        }

        return res.status(201).json(errors);
        
        
}

module.exports  = {
    
    addCampaign,
    updateCampaign,
    findAllCampaign,
    findCampaign,
    findDonorInCampaign,
    removeUsersFromCampaign

};

