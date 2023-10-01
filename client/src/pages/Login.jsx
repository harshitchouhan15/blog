import { useContext } from "react"
import { useState } from "react"
import styled from "styled-components"
import {axiosInstance} from "../config"
import { Context } from "../context/context"
import home from './assets/login.jpg'


const Container=styled.div`
   display: flex; 
   flex-direction: column;
   height: 100vh;
   justify-content: center;
   align-items: center;
   position: relative;
   &>h1{
    font-size: 60px;
    color: white;
    margin-bottom: 20px; top: 21%;
    font-family: 'Courier New', Courier, monospace;
    position: absolute;
    @media screen and (max-width:768px) {
      top: 25%;
      font-weight: 600;
    }
   }&>form{
display: flex;
flex-direction: column; 

    position: absolute;
gap: 15px;
&>label{
  font-size: 18px;
  color: white;
}
&>input{
  border: none;
  width: 280px;
  padding: 10px 10px;
  border-radius: 5px;
  font-size: 18px;
background-color: white;
  &:focus{
    outline: none;
  }
}
&>button{
  
}
   }

`
const Button=styled.button`
    border: none;
  cursor: pointer;
  border-radius: 5px;
  padding: 11px;
  font-size: 20px;
  color: white;
  margin-top: 8px;
  background-color: transparent;
border: 1px solid white;
font-weight: 500;
background-color: ${props=>props.load&&"#7612fa"};
cursor:${props=>props.load&&"not-allowed"};

`
const Photo=styled.img`
  width: 100%;
  height: 100vh;
object-fit: cover;
opacity: 1;

`

const Error= styled.span`
  color: #f3f1f1;
  text-align: center;
`

const Login = () => {
  const [error,setError]= useState(false)
const [username,setUsername]=useState("")
const [password,setPassword]=useState("")
const {isFetching,dispatch}=useContext(Context)

const handleSubmit=async(e)=>{
  e.preventDefault();
  dispatch({type:"LOGIN_START"})

  try{
    const res=await axiosInstance.post("/auth/login",{
      username:username,
      password:password
    })
    dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    
   window.location.replace("/")
  }catch(err){
    dispatch({type:"LOGIN_FAILURE"})
    setError(true)
  }

}

  return (
  <Container>
    <Photo src={home}/>
    <h1>Login</h1>
    <form onSubmit={handleSubmit} action="
    ">
      <label htmlFor="a">Username</label>
      <input onChange={(e)=>setUsername(e.target.value)} type="text" id="a" placeholder="Enter Username"/>
      <label htmlFor="b">Password</label>
      <input onChange={(e)=>setPassword(e.target.value)} type="password" id="b" placeholder="Enter your password"/>
      <Button load={isFetching}  type="submit">Login </Button>
      {error&& <Error>Wrong credentials!</Error> }
    </form>
    
  </Container>

  )
}

export default Login