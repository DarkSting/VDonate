const mongoose =require('mongoose');

const DonationRequestSchema = new mongoose.Schema({
    donationType:{
        type:String,
        required:true,
        enum:["plasma","plattlates","WholeBlood","PowerRed"]
    },   
    refNo:{
      type:Number,
      unique:true,
      required:true
    },
   
    Donor:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'UserModel'
    },
      isApproved:{
        type:Boolean,
        default:false,
      },
     
      approvedBy:{
        type:String,
        ref:'AdminModel'
      }
     
    

});



const DonationRequestModel = mongoose.model('DonationRequestModel',DonationRequestSchema);

module.exports ={
    
    DonationRequestModel,
    DonationRequestSchema
};
