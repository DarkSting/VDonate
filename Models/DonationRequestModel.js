const mongoose =require('mongoose');

const DonationRequestSchema = new mongoose.Schema({
    
  donationType:{
        type:String,
        required:[true,"donation type required"],
        enum:["Plasma","Plattlates","WholeBlood","PowerRed"]
    }, 

    refNo:{
      type:Number,
      unique:true,
      required:true
    },
   
    User:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'UserModel',
      required:[true,"User reference required"]
    },

      isApproved:{
        type:Boolean,
        default:false,
      },
     
      approvedBy:{
        type:String,
        ref:'AdminModel'
      },

     description:{
      type:String,
      default:""
     },

     approvedDate:{
      type:Date,
      
     }
    
});

const DonationRequestModel = mongoose.model('DonationRequestModel',DonationRequestSchema);

module.exports ={
    
    DonationRequestModel,
    DonationRequestSchema
};
