import styled from "styled-components"
import {Link} from "react-router-dom"
import { useContext, useState } from "react"
import { Context } from "./context/context"
import Avatar from '@mui/material/Avatar';
import Menu from "@mui/icons-material/Menu"


const Container=styled.div`
    height: 8vh;
    position: fixed;
    width: 100vw;
    top: 0;
    transition: all 0.5s ease;
    background-color: ${props=>props.scroll?"white":"transparent"};
   color: ${props=>props.scroll?"black":"white"};
   display: flex;
   align-items: center;
    z-index: 999;
    @media screen and (max-width:768px){
    justify-content: space-between;
    color:${props=>props.slide&&"white"}

   
}
`
const Left=styled.div`
font-size: 35px;
font-weight: 500;
    font-family: "Pacifico",cursive;
   width: 25%;
text-align: center;
@media screen and (max-width:768px){
    width: fit-content;
    text-align: start;
    font-size: 28px;
  margin-left: 10px;
}
`
const Right=styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
    @media screen and (max-width:768px){
    display: none;
}
`
const Center=styled.div`
    flex: 2;
   
    display: flex;
    align-items: start;
    justify-content: center;
    gap: 30px;
    font-size: 20px;
    @media screen and (max-width:768px){
    display: none;
}
`

const StyledLink=styled(Link)`
    text-decoration: none;
    color: ${props=>props.scroll?"#3c3c3d":"white"};
   font-size: 22px;
   @media screen and (max-width:768px){
    font-size: 25px;
    color: white;
}
   
    font-family: "Ubuntu";
`

const Toggle=styled.div`
    display: none;
    @media screen and (max-width:768px){
    display: flex;
    border-radius: 4px;
    border: 2px solid white;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 30px;
    margin-right: 10px;

}
`
const MenuItem=styled.div`
    display: none;
    @media screen and (max-width:768px){
    display: flex;
   z-index: -1;
    flex-direction: column;
   gap: 30px;
   font-size: 22px;
    align-items: center;
   width: 100vw;
   font-weight: 400;
   background-color: black;
   font-family: "Ubuntu",cursive;
   padding-top: 10vh;
   position: fixed;
   height: 50vh;
   top: ${props=>props.slide?0:"-60vh"};
 
transition: all 0.7s ease-in-out;
&>*{
&:hover{
    transform: translate(5px,-5px);
}
}}
`


const Photo=styled(Avatar)`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
`
const Topbar = ({scroll}) => {
    const [slide,setSlide]=useState(false)
    const {dispatch,user}=useContext(Context)
const handleLogout=()=>{
    dispatch({type:"LOGIN_FAILURE"})
}

  return (
    <Container slide={slide} scroll={scroll}>
        <Left>
     InspireVerse
        </Left>

        <Center>
       <StyledLink to='/' scroll={scroll}>Home</StyledLink> 
        
      <StyledLink to={user?"/write":"/login"} scroll={scroll}>Write</StyledLink> 
      {
        user? <StyledLink to="/register"  scroll={scroll} onClick={handleLogout}>Logout 
        </StyledLink>  :<>
       
<StyledLink to="/login" scroll={scroll} onClick={handleLogout}>Login 
</StyledLink>   </>
      }
      

        </Center>

        <Right>
            {
                user?   <Link to='/settings'><Avatar src={user?.profilePic}/></Link> 
                :   <StyledLink to='/register'>Register</StyledLink> 
            }
        
            
        </Right>
        
        <Toggle onClick={()=>setSlide(!slide)}><Menu /></Toggle>

        <MenuItem slide={slide}>
        {user?<>
            <Link onClick={()=>setSlide(false)} to='/settings'><Avatar style={{width:"10vw",height:"10vw"}} src={user.profilePic}/></Link>
            <StyledLink onClick={()=>setSlide(false)} to='/' scroll={scroll}>Hello!  {user.username}</StyledLink> 
        </>:
        <Link onClick={()=>setSlide(false)} to='/login'><Avatar style={{width:"10vw",height:"10vw"}} src={""}/></Link>
        }
        <StyledLink onClick={()=>setSlide(false)} to='/' scroll={scroll}>Home</StyledLink> 
        
        <StyledLink onClick={()=>setSlide(false)} to={user?"/write":"/login"} scroll={scroll}>Write</StyledLink> 
        {
          user? <StyledLink onClick={()=>{handleLogout();setSlide(false)}} to="/register"  scroll={scroll} >Logout 
          </StyledLink>  :<>
          <StyledLink onClick={()=>setSlide(false)} to="/register" scroll={scroll} >Register 
  </StyledLink> 
  <StyledLink onClick={()=>setSlide(false)} to="/login" scroll={scroll} >Login 
  </StyledLink>   </>
        }
        </MenuItem>

    </Container>
  )
}

export default Topbar