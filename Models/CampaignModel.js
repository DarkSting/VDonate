const mongoose =require('mongoose');
const {AdminSchema} = require('./AdminModel');
const {UserSchema} = require('./UserModel');
const { DonationRequestModel, DonationRequestSchema } = require('./DonationRequestModel');

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
    StaffGroup:{
        type:[AdminSchema]
        ,required:true
    },
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
      ]
      ,
      
});

const CampaignModel = mongoose.model('CampaignModel',CampaignSchema);

module.exports ={CampaignModel};
