const route=require('express').Router();
const User=require('../models/user')
const Post=require('../models/post')
const bcrypt=require('bcrypt');


route.put('/:id', async (req,res)=>{
    if(req.body.userID===req.params.id){
    if(req.body.password)  {
        const salt=await bcrypt.genSalt(10)
        req.body.password=await bcrypt.hash(req.body.password,salt)
    }  
        try{
            if(req.body.username){  
    
            const userToBeUpdated = await User.findById(req.params.id)
            await Post.updateMany({username:userToBeUpdated.username}, {$set:{username:req.body.username}})
             }
        const user=await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        }, {
            new:true
        })
      
const {password, ...others}=user._doc

        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
        console.error(err)
    }

}
    else{res.status(401).json('you can update only your account')}
})



//delete user
route.delete('/:id', async (req,res)=>{
    if(req.params.id===req.body.userID){
        try{
            const user=await User.findById(req.params.id)
           await Post.deleteMany({username: user.username})
           await user.deleteOne()
           res.status(200).json('account deleted')
        }catch(err){
            res.status(500).json(err)
        }
    }else{res.status(404).json('you can delete only your account')}
})





module.exports=route