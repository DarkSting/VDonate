const {DonationModel} = require('../Models/DonationModel');
const { DonationRequestModel } = require('../Models/DonationRequestModel');
const { UserModel } = require('../Models/UserModel');
const { sendmailInternal } = require('./MailControllers');
const jwt = require('jsonwebtoken');


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

const makeDonationRequest = async(req,res)=>{
    const{ donationType, description} = req.body;
    const token = req.cookies.jwt;

    let refid =0;


    //to get the receivers mail.
    let mail = ""
    subject = "Donation Request Recorded"
    title = "Your Donation Has Been Recorded"
    intro = ""
    buttontxt = "More Info"
    instructions = "Thank you for your generous respond!"

    const list = await DonationRequestModel.find({}).sort({refNo:-1});
    
    if(list.length===0){
        refidid=1;
    }
    else{
        refid= parseInt(list[0].refNo)+1;
    }
    if(token){
        
        //veryfying the token
     jwt.verify(token,process.env.SECRET,(err,decoded)=>{
 
         if(err){
             console.log(err.message);
             res.status(500).json("invalid token");
         }
         else{
            
            const time = new Date(0);

            //find the model correspond to the id
             UserModel.findOne({_id:decoded.id}).then(async(r)=>{
                
                mail = r.email;
                const newDonation = new DonationRequestModel({
                    User:decoded.id,
                    description:description,
                    refNo:refid,
                    donationType:donationType,
                    approvedDate:time
                })
                intro=`you have requested a <b style="color: red;">${donationType}</b> type`;
                
                newDonation.save().then(async(r)=>{
                    await sendmailInternal(mail,subject,title,intro,buttontxt,instructions).then(r=>{
                            res.status(200).json({msg:"email sent",code:200});
                    }).catch(e=>{
                               res.status(500).json({msg:e.message,code:500});
                })
                }).catch(err=>{
                    res.status(500).json({msg:"cannot create model",code:500});
                });
                //sending the mail
                
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

const findAllDonations = async(req,res,next)=>{

    await DonationModel.find({}).then(result=>{
      
        return res.status(201).json(result);

    }).atch(error=>{
       
        return res.status(500).json(error);
        
    });


}

const createDonation = async(req,res)=>{

    const{User,description,refNo,donationType} = req.body;

    const newDonation = new DonationRequestModel({
        User:User,
        description:description,
        refNo:refNo,
        donationType:donationType
    })

    newDonation.save().then(r=>{
        res.status(200).json("request success");
    }).catch(e=>{
        res.status(500).json(e.message);
    });
}


//accepting the donation requests
const acceptDonationRequest = async(req,res)=>{

const{ donorID, requestID } = req.body;

//checks whether the provided parameters values are valid
const foundUser = await UserModel.findOne({_id:donorID})
const foundRequestID = await DonationRequestModel.findOne({_id:requestID});

//if the request is a valid request then proceed the process
if(foundUser && foundRequestID){
    
    const time = new Date();
    time.setHours(0,0,0);

    const query = {$and:[{User:donorID},{_id:requestID}]};

    const update = {
      $set: {
        approvedDate:time,
        isApproved:true
      },
    };


    await DonationRequestModel.findOneAndUpdate(query,update).then(r=>{
        return res.status(200).json({msg:"request approved"});
    }).catch(error=>{
        return res.status(500).json({msg:error.message});
    })

}
else{
    return res.status(404).json({msg:"user not found"});
}


}

//delete donation requests
const deleteDonationRequests = async(req,res)=>{

    const{ donorID, requestID } = req.body;

    const maxtime = new Date(0);

    maxtime.setMonth(6);

    console.log(`${maxtime}`);


    const query = {$and:[{User:donorID},{_id:requestID}]};

    const update = {
      $set: {
        approvedDate:maxtime,
        isApproved:false
      },
    };

    //since we want to display the rejected approval we wont delete it permenently instead updating it
    await DonationRequestModel.findOneAndUpdate(query,update).then(r=>{

        return res.status(200).json({msg:"request rejected"});
    }).catch(error=>{
        return res.status(500).json({msg:error.message})
    })



}


//gets rejected requests
const getRejectedRequests = async(req,res)=>{

    const maxtime = new Date(0);

    maxtime.setMonth(6);

    console.log(maxtime);

    const foundrequests = await DonationRequestModel.find({$and:[{isApproved:false},{approvedDate:maxtime}]});

    let requestsArrays = [];

    //preparing the model accessing from the frontend 
    for(let request of foundrequests){

        try{
            let currentModel = {};

            if(request?.User){
                const User = await UserModel.findOne({_id:request.User._id});
    
                if(User){
                    User.password = null;
                    currentModel.User = User;
                    currentModel.request =request;
                    requestsArrays.push(currentModel);
                }
                
            }

        }catch(error){

           return res.status(500).json({msg:error.message});

        }
    


    }


    return res.status(200).json({requestsArrays});

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

//get approved requests
const getApprovedRequests = async(req,res)=>{


    const time = new Date(0);

    const foundrequests = await DonationRequestModel.find({$and:[{isApproved:true},{approvedDate:{$gt:time}}]});

    let requestsArrays = [];

    //preparing the model accessing from the frontend 
    for(let request of foundrequests){

        try{
            let currentModel = {};

            if(request?.User){
                const User = await UserModel.findOne({_id:request.User._id});
    
                if(User){
                    User.password = null;
                    currentModel.User = User;
                    currentModel.request =request;
                    requestsArrays.push(currentModel);
                }
                
            }

        }catch(error){

           return res.status(500).json({msg:error.message});

        }
    


    }


    return res.status(200).json({requestsArrays});

}



//get pending approve requests
const getNotApprovedDonationRequest = async(req,res)=>{

    const mintime =  new Date(0)

    const foundrequests = await DonationRequestModel.find({$and:[{isApproved:false},{approvedDate:mintime}]});

    let requestsArrays = [];

    //preparing the model accessing from the frontend 
    for(let request of foundrequests){

        try{
            let currentModel = {};

            if(request?.User){
                const User = await UserModel.findOne({_id:request.User._id});
    
                if(User){
                    User.password = null;
                    currentModel.User = User;
                    currentModel.request =request;
                    requestsArrays.push(currentModel);
                }
             
            }

        }catch(error){

           return res.status(500).json({msg:error.message});

        }
    


    }


    return res.status(200).json({requestsArrays});

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
    findDonation,
    makeDonationRequest,
    createDonation,
    getNotApprovedDonationRequest,
    acceptDonationRequest,
    deleteDonationRequests,
    getApprovedRequests,
    getRejectedRequests

};

