const mongoose =require('mongoose');
const {parsePhoneNumber} = require('libphonenumber-js')
const bcrypt = require('bcrypt');

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
      licenseNumber:{
        type:String,
        required:[true,'medical licence not provided'],
        unique:[true,'A number is already registered with the provided number']
      }
      ,
      password:{
        type:String,
        default:""
      },
      
      isActive:{
        type:Boolean,
        default:false
      }
  
});

AdminSchema.statics.login = async function(lisence,password){

  const user = this.findOne({licenseNumber:lisence});

  if(user){
      const auth = await bcrypt.compare(password,user.password);
      
      if(auth){
        return user;
      }
      else{
        throw Error("invalid password");
      }
  }

  Error("user not found")
}


const AdminModel = mongoose.model('AdminModel',AdminSchema);

module.exports ={
    
    AdminModel,
    AdminSchema
};
