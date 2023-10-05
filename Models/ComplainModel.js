const mongoose =require('mongoose');

const ComplainSchema = new mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'UserModel'
    },
      checked:{
        type:Boolean,
        default:false,
      },
     
      checkedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AdminModel',
      },
      description:{
        type:String,
        required:true
      }
      ,
      refNo:{
        type:String,
        unique:true,
        required:true
      }
      
    

});

const ComplainModel = mongoose.model('ComplainModel',ComplainSchema);

module.exports ={ComplainModel};
