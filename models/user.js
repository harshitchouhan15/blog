const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
   profilePic:{
    type:String
   },
    password:{
        type:String,
        required:true,
        
    },
},{timestamps:true})
module.exports=mongoose.model('user',userSchema)