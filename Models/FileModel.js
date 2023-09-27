const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({

    fileName:{
        type:String,
        require:[true,"latitude required"]
    },
    checked:{
        type:Boolean,
        default:false
    },
    createdDate:{
        type:Date,
        default:Date.now
    },
    userName:{
        type:String
    },
    mimeType:{
        type:String
    }

})

const fileModel = mongoose.model('filemodels',fileSchema);

module.exports = {
    fileModel
}