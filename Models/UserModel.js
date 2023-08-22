const mongoose =require('mongoose');
const {parsePhoneNumber} = require('libphonenumber-js')
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    userName:{
      type:String,
      required:[true,'name not provided']
    },
    age:Number,
    nic:{
      type:String,
      required:true,
      unique:true
    },
    password:{
      type:String,
    },
    QR:{
      type:Boolean,
      default:false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function (value) {
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
        unique:true,
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
                const bloodTypeRegex = /^(A|B|AB|O|N)[+-]$/;
                return bloodTypeRegex.test(value);
              },
              message: 'Please enter a valid blood type',
        }
        ,default:'N-'
      }
      

});

UserSchema.statics.login = async function(email,password){

    const user = await this.findOne({email:email});
    if(user){
      const auth = await bcrypt.compare(password,user.password);
      
      if(auth){
        return user;
      }

      throw Error('incorrect password');

    }

    throw Error('user not found');
}

//hashing the password
UserSchema.pre('save', async function () {
if(this.password!==""){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this.password);
}
  
});

const UserModel = mongoose.model('UserModel',UserSchema);

module.exports ={
  
  UserModel,
  UserSchema,

};
