const mongoose =require('mongoose');
const {AdminSchema} = require('./AdminModel');
const {UserSchema} = require('./UserModel');
const { DonationRequestModel, DonationRequestSchema } = require('./DonationRequestModel');

const CampaignSchema = new mongoose.Schema({
    location:{
        type:String,
        required:true
    },
    timeBegin:{
        type:Date,
        required:true
    },
    StaffGroup:{
        type:[AdminSchema]
        ,required:true
    },
      isValidated:{
        type:Boolean,
        default:false,
      },
     endAt: {
        type: Date,
        default: Date.now,
      },
      donationRequest:{
        type:[DonationRequestSchema],
        required:[true,'didnt get any donation requests']
      }
      

});

const CampaignModel = mongoose.model('CampaignModel',CampaignSchema);

module.exports ={CampaignModel};
