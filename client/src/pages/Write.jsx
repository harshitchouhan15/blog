import {axiosInstance} from "../config"

import { useContext, useRef } from "react"
import { useState } from "react"
import styled from "styled-components"
import { Context } from "../context/context"
import app from "../firebase"
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import AddIcon from '@mui/icons-material/Add';
import Add from "@mui/icons-material/Add"
import write from "./assets/write.jpg"
import { useEffect } from "react"
import "./loader.css"


export const Bg=styled.div`
  position: fixed;
  height: 8vh;
  width: 100vw;
  top: 0;
  display: none;
  background-color: #bc382e;
  @media screen and (max-width:768px){
 display: block;
}
`
const Container=styled.div`
   display: flex; 
   min-height: 100vh;
   padding-top: 20px;
   flex-direction: column-reverse;
   align-items: center;
color: white;
gap: 25px;
   position: relative;
   @media screen and (max-width:768px){

    gap: 25px;
    padding-top: 10px;
    
   justify-content: start;
    height: max-content;
}
   &>div{
    border: 1px solid white;
    border-radius: 10px;
    display: flex;
    margin-bottom: 80px;
    flex-direction: column;
    gap: 25px;
   width: 75%;
   padding: 20px;
   
   color: white;
   @media screen and (max-width:768px){
    width: 95vw;
    gap: 15px;
    margin-bottom: 10px;
    
}
   }
`
const BackGround=styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
z-index: -1;
`

const Button=styled.button`
border:1px solid white;
justify-content: center;
align-items: center;
     padding: 10px;
    background-color: transparent;
    color: white;
    border-radius: 4px;
    align-self: center;
    display: flex;
    transition: all 0.6s ease;
    font-size: 20px;
    width: 10vw;
    cursor: pointer;
    &:focus{
    cursor: none;
    };
    @media screen and (max-width:768px){
    width: 25vw;
}
   

  

   
`
const Photo=styled.img`
  width: 100%;
  height: 45vh;
  
  border-radius: 8px;
  @media screen and (max-width:768px){
    height: 30vh;
    min-width: 85vw;

}
`
export const Label=styled.div`
border: none;
padding: 5px;
display: flex;
align-items: center;
gap: 5px;
font-size: 18px;
@media screen and (max-width:768px){
    width: 100%;
  }
&>*{
  cursor: pointer;
}

&>:nth-child(2){
  margin-bottom: 5px;
 
}
&>input{
  visibility: hidden;
  
}

`

const Title=styled.input`
border: none;
padding: 5px;
font-size: 30px;
color: white;
background-color: transparent;
font-weight: 500;
font-family: "Ubuntu",cursive;
@media screen and (max-width:768px){
    width: 100%;
  };
&:focus{
  outline: none;
  border-bottom: 1px solid #403f40;
}`

const Textarea=styled.textarea`
      border: none;
   color: white;
    padding: 5px;
   background-color: transparent;
    width: 100%;

    font-size: ${props=>props.head?"45px":"20px"};
    &:focus{
        outline: 0.5px solid #a09fa2;
        height: 30vh;
    }
`

const Heading=styled.h1`
    font-size: 80px;
    font-weight: 500;
    text-align: center;
    
    font-family: "Pacifico",cursive;
    @media screen and (max-width:768px){
    font-size: 45px;
    padding-block: 10vh 8vh;
  
  };
`

const Write = () => {
  const {user}=useContext(Context)
  const [file,setFile]=useState(null)
  const [inputs,setInputs]=useState({})
 const [click,setClick]=useState(false)

const details={
  username:user.username,...inputs
}
  

  const handleChange=(e)=>{
    const value=e.target.value
    setInputs(n=>{
      return {
        ...n,[e.target.name]:value
      }
    })
  }

const handleCall=async()=>{
  try{
    const res=await axiosInstance.post("/posts/write",details
    )
  
    window.location.replace("/")
  }catch(err){
   console.log(err);
  }
 
}

const handleSubmit=()=>{

 
  const filename=Date.now()+file.name
  const storage=getStorage(app)
  const storageRef=ref(storage,filename)
  const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
(snapshot) => {
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
}, 
() => {
getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  console.log('File available at', downloadURL);
  
  details.photo=downloadURL
 handleCall()
 

}).catch((err)=>console.log(""));
}
);

}

useEffect(()=>{
  click && handleSubmit()
},[click])


return (
  <Container>
    <BackGround src={write}/>
    
   
<div >
{file &&
<Photo src={URL.createObjectURL(file)}/>}

<Label>
<label htmlFor="photo"> <Add htmlColor="white"/> </label> <label htmlFor="photo"> Add Image</label>
  <input onChange={(e)=>setFile(e.target.files[0])} type="file" name="" id="photo" />
    
    </Label>
  <Title  type="text" name="title" onChange={handleChange} id="" placeholder="Title"/>
 

<Textarea name="desc" onChange={handleChange}   placeholder="Tell your story"/>
<Button onClick={()=>setClick(true)}>  {click? 
 <div className="loader">

</div>: 'Publish'} </Button>

</div>



<Heading>Write blogs to share your views</Heading>
  </Container>
)

}


export default Write



