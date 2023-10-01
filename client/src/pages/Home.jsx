//first
import a1 from "./assets/asset 0.png"
import a2 from "./assets/asset 1.png"
import a3 from "./assets/asset 2.png"
import a4 from "./assets/asset 3.png"
import a5 from "./assets/asset 4.png"
import a6 from "./assets/asset 5.png"
//second
import b1 from "./assets/asset 7.png"
import b2 from "./assets/asset 8.png"
import b3 from "./assets/asset 9.png"
import b4 from "./assets/asset 10.png"
import b5 from "./assets/asset 11.png"
import b6 from "./assets/asset 12.png"
import b7 from "./assets/asset 13.png"
import b8 from "./assets/asset 14.png"
//third
import c1 from "./assets/asset 15.png"
import c2 from "./assets/asset 16.png"
import c3 from "./assets/asset 17.png"
import c4 from "./assets/asset 18.png"
import c5 from "./assets/asset 19.png"
import c6 from "./assets/asset 20.png"
import c7 from "./assets/asset 21.png"
import c8 from "./assets/asset 22.png"
//fourth
import d1 from "./assets/asset 23.png"


//finish
import styled from "styled-components"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useEffect } from "react"
import {axiosInstance} from "../config"
import { useState } from "react"
import {Link, useLocation} from "react-router-dom"



const array=[
    {bg:"#bc382e",
    left:[c2,c3,c4,c5],
    center:d1,
    right:[c6,c7,c8]
    },
{bg:"#4583aa",
left:[b3,b4,b5],
center:c1,
right:[b5,b6,b7,b8]
},
{bg:"#bc382e",
left:[c2,c3,c4,c5],
center:d1,
right:[c5,c6,c7,c8]
},
{bg:"#388d80",
left:[a1,a2,b1],
center:b2,
right:[a2,a3,a4,a5,a6]
},


]




const Intro=styled.div`
width: 100vw;
height: 110vh;
background-color: ${props=>props.bg};
display: flex;
align-items: flex-end;
justify-content: center;
overflow: hidden;
position: relative;
@media screen and (max-width:768px){
    width: 100vw;
    height: 52vh;
}
  
   
`

const Container=styled.div`
  
`

const Left=styled.div`
    width: 25vw;
    height: 70vh;
   display: flex;
   flex-direction: column;
    position: absolute;
left: 0;
bottom: 0;
 &>img{
   width: 17vw;
 
   
 };&>:first-child{
    
    width: 20vw;
    animation: first 5s alternate infinite ease-in;
    @keyframes first {
   0%,50%{
    transform: translate(-20vw,-15vh);
   }
   
   to{
       transform:translate(-20vw,90vh)
   }
  }
    
 };
 &>:nth-child(2){
   
    width: 12vw;
    animation: second 5s alternate infinite ease-in;
    
    @keyframes second {
   0%,50%{
    transform: translate(25vw,-70vh);
   }
   
   to{
       transform:translate(25vw,70vh)
   }
  }
  
 };
 &>:nth-child(3){
  
    animation: third 5s alternate infinite ease-in;
    @keyframes third {
   0%,50%{
    transform: translate(5vw,-60vh);
   }
   
   to{
       transform:translate(5vw,0vh)
   }
  }
 };
 &>:nth-child(4){
    transform: translate(17vw,-125vh);
    width: 5vw;
    
    animation: fourth 5s alternate infinite ease-in;
    @keyframes fourth {
   0%,50%{
    transform: translate(17vw,-125vh);
   }
   
   to{
       transform:translate(17vw,0vh)
   }
  }
 };
`

const Center=styled.img`
    width: 50vw;
    height: 55vh;

    justify-self: center;
    animation: centerdown infinite 5s ease-in alternate  ;
    @media screen and (max-width:768px){
    width: 75vw;
    height: 25vh;
}
  
  @keyframes centerdown {
    0%,50%{
    transform:translateY(0)
   }
   to{
       transform:translateY(75vh)
   }
  }
   
`
const Right=styled.div`
    width: 25vw;
    height: 50vh;
    display: flex;
   flex-direction: column;
    position: absolute;
    right: 0;
    bottom: 0;
    &>img{
   width: 17vw;
 
 };
   
  &>:first-child{
    transform: translate(-2vw,-5vh);
    width: 18vw;
    animation: first 5s infinite alternate ease-in;
    @keyframes first {
   0%,50%{
    transform: translate(-2vw,-5vh);
   }
   
   to{
       transform:translate(-2vw,35vh)
   }
  }
 };
  
 
 &>:nth-child(2){
    transform: translate(5vw,-60vh);
    width: 15vw;
    animation: second 5s infinite alternate ease-in;
    @keyframes second{
   0%,50%{
    transform: translate(5vw,-60vh);
   }
   
   to{
       transform:translate(5vw,35vh)
   }
  }
   
 };
 &>:nth-child(3){
    transform: translate(-5vw,-50vh);
    animation: third 5s infinite alternate ease-in;
    @keyframes third {
   0%,50%{
    transform: translate(-5vw,-50vh);
   }
   
   to{
       transform:translate(-5vw,35vh)
   }
  }
 };
 &>:nth-child(4){
    transform: translate(-22vw,-125vh);
    width: 8vw;
    animation: fourth 5s infinite alternate ease-in;
    @keyframes fourth{
   0%,50%{
    transform: translate(-22vw,-125vh);
   }
   
   to{
       transform:translate(-22vw,35vh)
   }
  }
 };
 &>:nth-child(5){
    transform: translate(-19vw,-120vh);
    width: 8vw;
    animation: fifth 5s infinite alternate ease-in;
    @keyframes fifth{
   0%,50%{
    transform: translate(-19vw,-120vh);
   }
   
   to{
       transform:translate(-19vw,35vh)
   }
  }
 };
`

const Featured=styled.div`
    display: flex;
    margin: 50px 0 0 30px;
    /* height: 100vh; */
   
    @media screen and (max-width:768px){
    margin-left: 0;
    height: max-content;
}
`

const Sidebar=styled.div`
    width: 25%;
   padding-top: 10vh;
  position: sticky;
  top: 0;
  height: 100vh;
  @media screen and (max-width:768px){
   display: none;
}
`
const Posts=styled.div`
    width: 75%;
    padding: 10px;
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   gap: 30px;
  
   @media screen and (max-width:768px){
    width: 100vw;
    gap: 30px;
    padding: 5px 0 ;
}
`

const Card=styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  gap: 5px;
  height: 50vh;

box-shadow: 2px 2px 4px 2px #b0afb2;
transition: all 0.4s ease-in;
border-radius: 7px;
@media screen and (max-width:768px){
   width: 100%;
   padding: 0;
  box-shadow: none;
}
&:hover{
    transform: translate(0.4vw,0.4vw);
   
}
  &>h1{
    font-size: 24px;
    font-weight: 500;
    color: #4c4b4c;
    font-family: "Ubuntu",cursive;
    text-align: center;
  };&>p{
    white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 95%; 
  padding: 0 5px;
  margin-bottom: 5px;
  }
`

export default function Home() {
    const location=useLocation()
    const query=location.search
   const [num,setNum]=useState(0)
    const [posts,setPosts]=useState([])



  useEffect(()=>{
      const getAllPosts=async ()=>{
          const res=await axiosInstance.get("/posts/"+query)
         setPosts(res.data)
      }
     getAllPosts()
      
  },[query])

useEffect(()=>{
  const interval=setInterval(()=>{
      num===3?setNum(0):setNum(n=>n+1)
  },5000)
  return ()=>clearInterval(interval)
},[num])

  return (
    <Container>
    
        <Intro bg={array[num].bg}>
              <Left>
                    <img src={array[num].left[0]}/>
                    <img src={array[num].left[1]}/>
                    <img src={array[num].left[2]}/>
                    <img src={array[num].left[3]}/>
                </Left>
            <Center src={array[num].center}/>
                      <Right>
                        <img src={array[num].right[0]}/>
                        <img src={array[num].right[1]}/>
                        <img src={array[num].right[2]}/>
                        <img src={array[num].right[3]}/>
                        <img src={array[num].right[4]}/>
                        </Right>
                                  </Intro>


        <Featured>
            <Posts>
{posts.map((item,i)=>(
    <Post key={i} src={item.photo}
    desc={item.desc} 
    title={item.title} 
    id={item._id}
    username={item.username}
     time={new Date(item.createdAt).toDateString()}/>
)).reverse()}
            </Posts>

                    <Menu/>
          
        </Featured>
    </Container>
  )
}






const Top=styled.div`
    height: 75%;
    padding: 0;
`
const Image=styled.img`
    width: 100%;
    height: 100%;

`

const Username=styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    &>h3{
        font-size: 19px;
        cursor: pointer;
    }
`
const Post=({id,src,username,title,desc,time})=>{
    
     
        return ( 
            <Card>
   <Top>
   <Link to={`/posts/${id}`} >
   <Image src={src}/></Link></Top>  
       
        <Username>  <h3>{username}</h3>
        
        <span>{time}</span></Username>  
       
       

<h1>{title}</h1>
<p>{desc}</p>


 </Card>
    )
}


export function Menu(){
    return (
        <Sidebar>
   <ImageList
      sx={{ width: "100%", height: "100%" }}
      variant="quilted"
      cols={2}
      rowHeight={150}
    >
{itemData.map(item=>(
<ImageListItem key={item.img}>
<img src={item.img} alt="" />

</ImageListItem>
))}
  </ImageList>
 
                    </Sidebar>
    )
}


const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      rows: 2,
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      author: '@arwinneil',
      rows: 2,
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
      },
 
    ]