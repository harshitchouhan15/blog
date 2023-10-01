const mongoose= require('mongoose');

const postSchema=new mongoose.Schema({
        title:{
            type:String,
            unique:false,
            required:true
        }
       
        ,
        photo:{
            type:String,
         
        }
      ,
        desc:{
            type:String,
            unique:false,
            required:false
        },
        username:{
            type:String,
            required:true
        }
},{timestamps:true})

module.exports=mongoose.model('post', postSchema )