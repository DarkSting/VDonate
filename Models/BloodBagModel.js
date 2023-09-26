const mongoose = require('mongoose');


const BloodBagSchema = new mongoose.Schema({


    dateCreated :{
        type:Date,
        default:Date()
    },
    donor:{
        type:mongoose.Schema.ObjectId,
        ref:'UserModel',
    },
    capacity:{
        type:Number,
        required:[true,"capacity required"],
        default:0
    },
    bloodType:{
        type:String,
        validate:{
            validator: function (value) {
                const bloodTypeRegex = /^(A|B|AB|O|N)[+-]$/;
                return bloodTypeRegex.test(value);
              },
              message: 'Please enter a valid blood type',
        }
        ,default:'N-'
      },
    donationType:{
        type:String,
        required:[true,"donation type required"],
        enum:["Plasma","Plattlates","WholeBlood","PowerRed"]
    },
    presevativesAdded:{
        type:String,
        enum:["AS-1", "AS-3", "AS-5",""]
    },
    filled:{
        type:Boolean,
        default:false
    }

});

module.exports = mongoose.model('BloodBagModels',BloodBagSchema);