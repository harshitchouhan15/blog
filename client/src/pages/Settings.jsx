import styled from "styled-components"
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from "react"
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import { Context } from "../context/context"
import { useState } from "react"
import {axiosInstance} from "../config"

import app from "../firebase"
import { Label } from "./Write"
import Add from "@mui/icons-material/Add"
import Avatar from '@mui/material/Avatar';
import { Modal } from "@mui/material"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import './loader.css'

const Container=styled.div`
   display: flex; 
  flex-direction: column;
  background-color:black;
  position: relative;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  &>*{
    padding: 20px;
  }
`
const Top=styled.div`
  display: flex;
  justify-content:center;
  gap: 5vw;
position: relative;
align-items: center;
width: 70%;
margin-block: 50px;
@media screen and (max-width:768px){
  justify-content: space-between;
  width: 70vw;
  gap: 8vw;
  margin-block: 80px 20px;
}
`

const TopLeft=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  &>p{
    font-size: 22px;
    font-family: "Ubuntu",cursive;
    font-weight: 500;
    color: white;
  };
  &>h3{
    font-size: 21px;
    font-family: "Ubuntu",cursive;
    font-weight: 500;
    color: white;
  }
`
const Bottom=styled.div`
  display: flex;
  flex-wrap: wrap;
 
  gap: 15px;
  width: 70%;
padding-top: 20px;
margin-bottom: 5px;
border-top: 1px solid #acaaaf;

@media screen and (max-width:768px){
 gap: 10px;
  width: 90vw;

}
`

const Post=styled.img`
  width: 20vw;
  height: 20vw;
  &:hover{
    transform: scale(1.05);
  };
  @media screen and (max-width:768px){
    height: 30vw;
  width: 35vw;
}
`
const Edit=styled.div`
display: flex;
align-items: center;
color: white;
gap: 5px;
  cursor: pointer;
  font-size: 30px;
 right: 10px;
 @media screen and (max-width:768px){
font-size: 18px;

}
&>*{
  font-size: 30px;
}
  `

const Settings = () => {
const {user}=useContext(Context)
  const [settingsModel,setSettingsModel]=useState(false)
  const [posts,setPosts]=useState([])
  
  useEffect(()=>{
    const getAllUserPosts=async()=>{
      const res=await axiosInstance.get("/posts/?user="+user?.username)
      setPosts(res.data)
    }
    getAllUserPosts()
  },[user.username])

  return (
   <Container>
 
    
    
    <Modal open={settingsModel} onBackdropClick={()=>setSettingsModel(false)}>
   <SettingSection  close={setSettingsModel}/>
   </Modal>

    <Top> 
  
    
      <TopLeft>
      
        <Avatar sx={{width:"10vw", height:"10vw"}} src={user?.profilePic}/>
        <p>{user?.username}</p>

      </TopLeft>

      <TopLeft>
        <h3>Posts</h3>
        <p>{posts.length}</p>
      </TopLeft>
     <Edit onClick={()=>setSettingsModel(true)}><EditIcon htmlColor="white"/>  Edit</Edit>
    </Top>

    <Bottom>

      {posts.map(post=>(
      <Link to={`/posts/${post._id}`}> <Post src={post.photo} /></Link> 

      ))}
    </Bottom>

   </Container>
  )
}

export default Settings

const SettingSection=({close})=>{

  const [file,setFile]=useState(null)
 const [inputs,setInputs]=useState({})
const {user,dispatch}=useContext(Context)
const [open,setOpen]=useState(false)
const [click,setClick]=useState(false)



  const handleChange=(e)=>{
    
    const value = e.target.value===''?e.target.defaultValue:e.target.value
    setInputs(n=>{
      return {
        ...n,[e.target.name]:value
      }
    })
  }

const updatedUser={...inputs,userID:user?._id}

  const handleUpdate=async()=>{
  
  try{
    const res=await axiosInstance.put("/users/"+user._id,updatedUser
    )
    dispatch({type:"UPDATE_SUCCESS",payload:res.data})
  close(false)
    
  }catch(err){
    dispatch({type:"UPDATE_FAILURE"})
  }
  }

  const handleDelete=async()=>{
    
    try{
      await axiosInstance.delete("/users/"+user._id, {data:{userID:user._id}})
      dispatch({type:"LOGIN_FAILURE"})
      window.location.replace("/register")
    }catch(err){
      console.log('')
    }
   
  }

  const handleSubmit=()=>{
    
    const filename=Date.now()+file?.name
    const storage=getStorage(app)
    const storageRef=ref(storage,filename)
    const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
(snapshot) => {
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;
  }
}, 
(error) => {
  // Handle unsuccessful uploads
}, 
() => {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    console.log('File available at', downloadURL);
    
    updatedUser.profilePic=downloadURL
    handleUpdate()
 

  }).catch((err)=>console.log(''));
}
);

}

useEffect(()=>{
click && file? handleSubmit() :click&& handleUpdate()
},[click,file])

  return(
<Form >

<head><h4>Update Your Account</h4>
<span onClick={()=>setOpen(true)}>Delete Account</span>
</head>


<div><span ><Photo sx={{ width: "10vw", height: "10vw" }} src={file?URL.createObjectURL(file):user.profilePic}/></span>
<Label>
  <label htmlFor="photo"> <Add htmlColor="teal"/> </label> <label htmlFor="photo"> Update Photo</label>
    <input onChange={(e)=>setFile(e.target.files[0]
      )} type="file" name="" id="photo" />
      
      </Label></div>

<Inputs>
  
<input defaultValue={user.username}  name="username" onChange={handleChange} type="text"  id='a' placeholder={user.username}/>
<input defaultValue={user.email} name="email" onChange={handleChange} type="email" id="b" placeholder={user.email}/></Inputs>

<Button onClick={()=>setClick(true)} >{
  click?<div className="loader"></div>
   : 'Update'
}
   </Button>


<Modal  open={open} onBackdropClick={()=>setOpen(false)}>
<Delete style={{outline:"none"}}>
<h3>Are you sure you want to delete your account?</h3>
<p>If you do so your all the posts and data will be deleted as well.</p>
<span>
  <Button cancel={true} onClick={()=>setOpen(false)}>Cancel</Button>
  <Button delete="fgj" onClick={handleDelete}>Delete</Button>
</span>
</Delete>
    </Modal>
</Form>
  )
}


const Form=styled.div`
    width: 50vw;
    height: 60vh;
    background-color: white;

    outline: none;
   padding:  20px;
   flex-direction: column;
   display: flex;
   gap: 12px;
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   margin: auto;
  @media screen and (max-width:768px){
    width: 87vw;
    height: 55vh;
  }
   
   &>head{
    display: flex;
    justify-content: space-between;
    align-items: center;
   
    color: teal;
    font-family: 'sans-serif';
    font-size: 20px;
    &>span{
      font-size: 16px;
      font-weight: 400;
      color: #bc382e;
      padding: 10px;
      border-radius: 5px;
      transition: all 1s ease;
      cursor: pointer;
      &:hover{
        background-color: #bc382e;
      
        color: white;
      }
    }
   }
   &>div{
    display: flex;
    flex-direction:column;
    gap: 5px;
    &>span{
      display: flex;
      align-items: center;
      gap: 20px;
      margin-top: 13px;
    }


    }
   
`

const Inputs=styled.span`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  @media screen and (max-width:768px){
    flex-direction: column;
    align-items: start;
    gap: 15px;
  }
  &>input{
border: none;
width: 30%;
border-bottom:2px solid #f1e9e9;
padding: 8px 0;
@media screen and (max-width:768px){
   width: 90%;
  }
&:focus{
  outline: none;
}}
  
`
const Button=styled.button`
 align-self: center;
 margin-top: 45px;
 padding: 10px 20px;
 background-color: #079615;
 background-color: ${props=>props.cancel&&"white"};
 background-color: ${props=>props.delete&&"#bc382e"};
 color: white;
 color: ${props=>props.cancel&&"#bc382e"};
 border: none;
 display: flex;
 justify-content: center;
 align-items: center;
 border: ${props=>props.cancel&&"1px solid #bc382e"};
border-radius: 7px;
width: 12vw;
cursor: pointer;
font-size: 18px;
&:focus{
  cursor: none;
  background-color: #067511;
}
@media screen and (max-width:768px){
width: max-content;
  }
`
const Photo=styled(Avatar)`
  object-fit: cover;
  border-radius: 50%;
`
const Delete=styled.div`
  position: absolute;
  width: 30vw;
  height: 35vh;
 padding: 20px;
  font-weight: 300;
  color: #414044;
  background-color: white;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
 bottom: 0;
 display: flex;
 flex-direction: column;
 gap: 15px;
 justify-content: center;
 align-items: center;
 @media screen and (max-width:768px){
    width: 70vw;
    height: 35vh;
  }
 &>h3{
  font-weight: 400;
 }
 &>
 span{
display: flex;
align-items: center;
gap: 25px;
transform: translatY(-40px);
 }

`