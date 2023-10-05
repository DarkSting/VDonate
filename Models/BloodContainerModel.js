const mongoose = require('mongoose');


const BloodContainerSchema = new mongoose.Schema({

    dateCreated:{
        type:Date,
        default:Date.now
    },

    collected:{
        type:Number,
        default:0
    }
    ,
    capacity:{
        type:Number,
        default:0
    }
    ,
    bloodBags:[{
        type:mongoose.Schema.ObjectId,
        ref:'BloodBagModels'
    }]

})

module.exports = mongoose.model('BloodContainerModels', BloodContainerSchema);