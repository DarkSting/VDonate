const mongoose =require('mongoose');

const ComplainSchema = new mongoose.Schema({
    location:{
        type:String,
    },
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
        required:true
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
