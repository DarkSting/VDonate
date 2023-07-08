const mongoose =require('mongoose');
const {AdminSchema} = require('./AdminModel');
const {UserSchema} = require('./UserModel')

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
    DonorsGroup:{
        type:[UserSchema],
        required:true
    },
      isValidated:{
        type:Boolean,
        default:false,
      },
     endAt: {
        type: Date,
        default: Date.now,
      },
      _id: {
        type: String, // or any other desired type for your custom ID
        required: true,
        unique: true
      },
      name:String,
     
      bloodGroup:{
        type:[String],
        required:true,
        validate:{
            validator: function (value) {
                
                const bloodTypeRegex = /^(A|B|AB|O)[+-]$/;
                if(!bloodTypeRegex.test(value)){
                  return false;
                }
              },
              message: 'Please enter a valid blood type',
        }
      }
      
    

});

const CampaignModel = mongoose.model('DonationModel',CampaignSchema);

module.exports ={CampaignModel};
