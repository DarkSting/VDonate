const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({

    fileName:{
        type:String,
        require:[true,"latitude required"]
    },
    checked:{
        type:String,
        default:false
    },
    createdDate:{
        type:Date,
        default:Date.now
    },
    userName:{
        type:String
    }

})

const fileModel = mongoose.model('filemodels',fileSchema);

module.exports = {
    fileModel
}