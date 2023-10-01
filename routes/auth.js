const route=require('express').Router()
const User=require('../models/user')
const bcrypt=require('bcrypt')

route.post('/register', async (req,res)=>{
    try{
        const salt= await bcrypt.genSalt(10)
        const hashedPass=await bcrypt.hash(req.body.password, salt)
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass
        })
        const user=await newUser.save();
        res.status(200).json(user)
        
    }catch(err){
        console.error(err);
        res.status(500).json(err)
    }

})

route.post('/login', async (req,res)=>{
    try{
        const user=await User.findOne({username:req.body.username});
        if(!user) return res.status(401).json('user not found!')
       
        const validated=await bcrypt.compare(req.body.password,user.password)
if(!validated) return res.status(404).json("wrong credentials")
      

        const {password,...others}=user._doc;
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports=route