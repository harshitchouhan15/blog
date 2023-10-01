const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const postRoute=require("./routes/post")
const authRoute=require('./routes/auth')
const userRoute=require('./routes/user')
const path=require('path')
dotenv.config();

mongoose.connect(process.env.mongo_url)
.then(()=>console.log('db connection is successful')).catch((e)=>console.log(e))

const app=express()
app.use(express.json())


app.use('/api/auth',authRoute)
app.use('/api/users', userRoute)
app.use("/api/posts", postRoute)

app.listen(process.env.PORT || 5800,()=>{
    console.log('backend is running!')
})


app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});