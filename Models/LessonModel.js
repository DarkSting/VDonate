const mongoose =require('mongoose');
const {AdminSchema} = require('./AdminModel');

const LessonSchema = new mongoose.Schema({
    author:{
        type:String,
        required:true
    },
    released:{
        type:Date,
        required:true
    },
    approvedBy:{
        type:AdminSchema
        ,required:true
    },
      isValidated:{
        type:Boolean,
        default:false,
      },
     title: {
        type: String,
        default: 'no title'
      },
      _id: {
        type: String,
        required: true,
        unique: true
      },
     content:{
        type:String
     }
 
    

});

const  LessonModel = mongoose.model('LessonModel',LessonSchema);

module.exports ={LessonModel};
