const route=require('express').Router();

const Post=require('../models/post')




route.get("/",async (req,res)=>{
    try{
        const qusername=req.query.user
        const qcategory=req.query.cat
        let posts
        if(qcategory) posts=await Post.find({category:qcategory})
        else if(qusername) posts=await Post.find({username:qusername})
        else{posts=await Post.find()
           }
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json(err)
    }
    
})

route.get("/:id", async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
})

route.put("/:id", async (req,res)=>{
    
    try{
        const post=await Post.findById(req.params.id)
        if(post.username===req.body.username){
            const updatedPost= await Post.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
         
            res.status(200).json(updatedPost)
        }else{
            res.status(500).json("you can update only your post!")
        }
       
    }catch(err){
        res.status(500).json(err)
    }
})

route.delete("/:id", async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        if(post.username===req.body.username){
            await Post.findByIdAndDelete(req.params.id)
            res.status(200).json("post deleted")
        }else{
            res.status(500).json("you can delete only your post!")
        }
       
    }catch(err){
        res.status(500).json(err)
    }
})


route.post("/write",async (req,res)=>{
    try{
        const newPost=new Post(req.body)
        const savedPost=await newPost.save()

        res.status(200).json(savedPost)
    }catch(err){
        res.status(500).json(err)
    }
})




module.exports=route