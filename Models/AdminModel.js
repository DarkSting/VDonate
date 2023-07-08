const mongoose =require('mongoose');
const {parsePhoneNumber} = require('libphonenumber-js')

const AdminSchema = new mongoose.Schema({
    userName:String,
    age:Number,
    nic:{
      type:String,
      required:true
    },
    role:{
        type:String,
        required:true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function (value) {
            // Regular expression to validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
          },
          message: 'Please enter a valid email address',
        },
      },
      isValidated:{
        type:Boolean,
        default:false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      phone: {
        type: String,
        default: 0,
        validate:{
            validator:function(value){
               
              const phoneNumber = parsePhoneNumber(value, 'LK');
              return phoneNumber.isValid();
              
            },
            message:'Please enter a valid phone number'
        }
      },
      gender:{
        type:Boolean,
        required:true,
        default:false
      },

      photo:{
        type:Buffer,
      },
      bloodType:{
        type:String,
        validate:{
            validator: function (value) {
                const bloodTypeRegex = /^(A|B|AB|O)[+-]$/;
                return bloodTypeRegex.test(value);
              },
              message: 'Please enter a valid blood type',
        }
      },
      role:{
        type:String,
        default:null
      },
      yearOfEXp:{
        type:String,
        default:null
      },
      qualifications:{
        type:[String],
        default:null
      }
      
    

});

const AdminModel = mongoose.model('AdminModel',AdminSchema);

module.exports ={
    
    AdminModel,
    AdminSchema
};
