const mongoose=require('mongoose');


const UserSchema=mongoose.Schema({
    title: {
        type: String,
        required: true
      },

    price:{
        type:Number,
        required:true,

    },
    description:{
        type:String,
        required:true,
    }

})
UserSchema.index({ email: 1 });
const UserMOdel=mongoose.model('users',UserSchema);
module.exports={
    UserMOdel
}