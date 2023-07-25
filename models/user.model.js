const mongoose=require('mongoose');
const UserSchema=mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: (value) => {
            // Custom email validation logic
            return /^\S+@\S+\.\S+$/.test(value);
          },
          message: 'Invalid email format',
        }
      },
      password: {
        type: String,
        required: true
      },
      role:{
        type:String,
        default:"user"
      },
      mobileNumber: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            return /^[0-9]{10}$/.test(value);
          },
          message: props => `${props.value} is not a valid 10-digit mobile number!`
        }
      }
})
UserSchema.index({ email: 1 });
const UserMOdel=mongoose.model('users',UserSchema);
module.exports={
    UserMOdel
}