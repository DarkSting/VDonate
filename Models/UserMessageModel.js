const mongoose = require('mongoose');


const MessageSchema = new mongoose.Schema({

    dateCreated:{
        type:Date,
        default:Date.now
    },
    receiver:{

        type:String,
        default:""

    },

    sender:{
        type:String,
        required:[true,'sender not provided']
        
    }
    ,
    senderID:{
        type:mongoose.Schema.ObjectId,
        required:[true,'provide the user object id']
    }
    ,
    isWatched:{
        type:Boolean,
        default:false
    },
    description:{
        type:String,
        required:[true,'description not provided']
    }
  

})

 const MessageModel = mongoose.model('UserMessageModels', MessageSchema);

 module.exports = {MessageModel}