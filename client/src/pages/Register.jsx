import { useState } from "react"
import {axiosInstance} from "../config"
import styled from "styled-components"
import home from './assets/register.jpg'
import { Link } from "react-router-dom"

const Container=styled.div`
   display: flex; 
  width: 100vw;
   height: 100vh;
   justify-content: center;
   align-items: center;
   position: relative;
   &>h1{
    font-size: 55px;
    margin-bottom: 30px;
    top: 16%;
    position: absolute;
    color: white;
    font-family: 'Courier New', Courier, monospace;
    @media screen and (max-width:768px) {
      top: 18%;
      font-weight: 500;
      font-size: 50px;
    }
   }&>form{
display: flex;
margin-top: 10px;
flex-direction: column;
width: 22vw;
gap: 10px;
@media screen and (max-width:768px) {
  transform: translateY(80vh);
  width: 65vw;
      animation: slide 1.2s 1 ease forwards;
      @keyframes slide {
        to{
transform: translate(0);
        }
      }
    }
&>label{
  font-size: 18px;
  font-weight: 500;
  color: #f2f0f0;
}
&>input{
  border: none;
  
  padding: 13px 10px;
  border-radius: 5px;
  font-size: 18px;
  @media screen and (max-width:768px) {
      
    }
  &:focus{
    outline: none;
  }
}
&>button{
  border: none;
  cursor: pointer;
  border-radius: 5px;
  padding: 11px;
  font-size: 20px;
  margin-top: 5px;
  color: white;
  background-color: transparent;
  border: 1px solid white;
  &:focus{
    cursor: wait;
  }
}
   }

`

const Photo=styled.img`
  width: 100%;
  height: 100vh;
object-fit: cover;
opacity: 1;
position: absolute;
z-index: -1;
`


const Error= styled.span`
  color: white;
  text-align: center;
`

const Register = () => {
const [error,setError]= useState(false)
  const [email,setEmail]=useState('')
  const [username,setUsername]=useState("")
const [password,setPassword]=useState("")
  

const handleSubmit=async(e)=>{
  e.preventDefault()
  try{
   const res= await axiosInstance.post("/auth/register",{
      username,
      password,
      email 

    })
   window.location.replace("/login")

  }catch(err){
setError(true)
  }
}

  return (
    <Container>
     < Photo src={home}/>
    <h1>Register</h1>
    <form onSubmit={handleSubmit}
    >
      <label htmlFor="m">Username</label>
      <input onChange={(e)=>setUsername(e.target.value)} type="text" id="m" placeholder="Sam"/>
      <label htmlFor="a">Email</label>
      <input onChange={(e)=>setEmail(e.target.value)} type="email" id="a" placeholder="sam@gmail.com"/>
      <label htmlFor="b">Password</label>
      <input onChange={(e)=>setPassword(e.target.value)} type="password" id="b" placeholder="Enter your password"/>
      <button type="submit">Register</button>
      {error&& <Error>Try with unique username and email.</Error> }
    </form>
  
  </Container>
  )
}

export default Register