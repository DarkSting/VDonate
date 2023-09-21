const mongoose =require('mongoose');

const CampaignSchema = new mongoose.Schema({

    location:{
        type:String,
        required:true
    },
    organizedBy:{
      type:mongoose.Schema.ObjectId,
      required:[true,"organizer required"],
      ref:'adminmodels'
    },
    timeBegin:{
        type:Date,
        required:true
    },
    
    StaffGroup:[{
        
      type:mongoose.Schema.ObjectId,
      ref:'adminmodels'
    }],
      isCompleted:{
        type:Boolean,
        default:false,
      },
     endAt: {
        type: Date,
        default: Date.now,
      },
      donors:[
        {
          type:mongoose.Schema.ObjectId,
          ref:'usermodels'
        }
      ],
      bloodContainer:{
        type:mongoose.Schema.ObjectId,
        ref:'bloodBagmodels'
      }
      

      
});

const CampaignModel = mongoose.model('CampaignModel',CampaignSchema);

module.exports ={CampaignModel};
