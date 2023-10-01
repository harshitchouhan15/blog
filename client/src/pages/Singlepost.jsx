import styled from "styled-components"
import { Menu } from "./Home"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from "react"
import { Context } from "../context/context"
import { useState } from "react"
import { useRef } from "react"
import {axiosInstance} from "../config"

import { Link, useLocation } from "react-router-dom"
import { useEffect } from "react"

const Bg=styled.div`
  position: fixed;
  height: 8vh;
  width: 100vw;
  top: 0;
  display: block;
  background-color: black;
  @media screen and (max-width:768px){
 display: block;
}`

const Container=styled.div`
   display: flex; 
   margin-top: 50px;
   @media screen and (max-width:768px){
 position: relative;
};
`
const Left=styled.form`
    flex: 3;
  

    & p::first-letter{
        font-size: 38px;
        margin-left: 100px;
        font-weight: 600;
    }
    &>*{
        margin-top: 30px;
        padding: 0 20px;
    }
    & >p{
        line-height: 22px;
        
    }
`

const Photo=styled.img`
    width: 100%;
    height: 60vh;
    @media screen and (max-width:768px){
padding: 0;
}
`
const Flex=styled.div`
    display: flex;
justify-content: center;
position: relative;

align-items: center;
@media screen and (max-width:768px){
position: static;
}
`
const Title=styled.h1`
    font-size: 45px;
    font-weight: 500;
    color: #211f25d7;

`
const Desc=styled.p`
    font-size: 18px;
    margin-bottom: 5vh;
`
const Options=styled.div`
    display: flex;
 position: absolute;
 right: 15px;
    gap: 15px;
    &>*{
        cursor: pointer;
    };  @media screen and (max-width:768px){
bottom: 10px;
right: 10px;
}
`
const Author=styled.div`
    display: flex;
   color: #e2c311;
    justify-content: space-between;
`
const Button=styled.button`
    border: none;
    background-color: #099809;
    color: white;
    cursor: pointer;
    padding: 10px 18px;
     border-radius: 5px;
     margin-left: 4vw;
     align-self: center;
     font-size: 16px;
     margin-bottom: 5vh;
     @media screen and (max-width:768px){
margin-left: 12px;
}
`
const Input=styled.input`
    border: none;
    border-bottom: 1px solid black;
    padding: 5px;
    text-align: center;
    width: 100%;
width: ${props=>props.head&&'50%'};
    font-size: 45px;
    &:focus{
        outline: none;
    };
    @media screen and (max-width:768px){
width: 100%;
padding: 3px;
font-size: 28px;
}

`



const Singlepost = () => {
    const location=useLocation()
    const [post,setPost]=useState({})
    const path=location.pathname.split("/")[2]
const [edit,setEdit]=useState(false)
const title=useRef()
const desc=useRef()
    const {user}=useContext(Context)
   

useEffect(()=>{
    const getPost=async ()=>{
        const res=await axiosInstance.get("/posts/"+path)
        setPost(res.data)
    }
    getPost()
  },[path])  



const handleDelete=async()=>{
    await axiosInstance.delete("/posts/"+post._id,{
        data:{username:user.username}
    })
    window.location.replace('/')
}

    const handleUpdate=async(e)=>{
        e.preventDefault()
     try{
        const updatedPost= await axiosInstance.put(`/posts/${post._id}`, {
           title:title.current.value,
           desc:desc.current.value,
           username:user.username
       })
     
      setPost(updatedPost.data)
       setEdit(false)
     } catch(err){
      
     }

    
       
    }
  return (
    <Container>
        <Bg/>
        <Left onSubmit={handleUpdate}>
         < Photo src={post.photo}/>  
     <Flex> 
          {edit?<Input type="text" defaultValue={post.title} ref={title} head={true}/>:<Title>{post.title}</Title>}  
           <Options>

       { user?.username===post.username && 
       <>
       <span onClick={()=>setEdit(true)} >
        < EditIcon htmlColor='green' /></span>
            <span onClick={handleDelete} >
                < DeleteIcon htmlColor='crimson' />
                </span>
                 </>}    

           </Options></Flex> 
           <Author>     <Link className="link" to={`/?user=${post.username}`}>{post.username}</Link>
           <span>{new Date(post.createdAt).toDateString()}</span></Author>
            {edit?<Textarea  type="text" defaultValue={post.desc} ref={desc} />:<Desc>{post.desc}</Desc>}  
     {edit&& <Button onClick={handleUpdate}>Update</Button>}
        </Left>

        <Menu/>
    </Container>
  )
}

export default Singlepost

const Textarea=styled.textarea`
      border: none;
   height: 30vh;
    padding: 5px;
   
    width: 100%;

    font-size: 18px;
    &:focus{
        outline: none;
    }
`
