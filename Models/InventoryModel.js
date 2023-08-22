const mongoose =require('mongoose');
const {DonationSchema} = require('./DonationModel')

const InventorySchema = new mongoose.Schema({
    
    bloodUnits:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true,
        validate:{
            validator: function (value) {
                const bloodTypeRegex = /^(A|B|AB|O)[+-]$/;
                return bloodTypeRegex.test(value);
              },
              message: 'Please enter a valid blood type',
        }
    },
   Donations:{
    type:[DonationSchema],
    required:true
   }
   ,    
    
    

});

const InventoryModel = mongoose.model('InventoryModel',InventorySchemaSchema);

module.exports ={InventoryModel};
