
import Home from './pages/Home'
import Settings from './pages/Settings'
import Singlepost from './pages/Singlepost'
import Write from './pages/Write'
import Topbar from './topbar'
import Login from './pages/Login'
import Register from './pages/Register'
import { Navigate, Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { useContext } from 'react'
import { Context } from './context/context'
import { useEffect } from 'react'
import { useState } from 'react'

const  App = () => {
  const {user}=useContext(Context)
  const [scroll,setScroll]=useState(false)

  useEffect(()=>{
const scroll=()=>{
  window.scrollY>0?setScroll(true):setScroll(false)
}
window.addEventListener("scroll",scroll)

return ()=>{
  window.removeEventListener('scroll',scroll)
}
  },[])

  return (
     
        
    <Router>
    <Topbar scroll={scroll}/>
<Routes>

 < Route exact path="/" element={<Home/>}/>
 < Route  path="/posts/?user=" element={<Home/>}/>
 <Route path="/settings" element={user?<Settings/>:<Navigate to ='/register' />}/>
 <Route path='/login' element={!user?<Login/>:<Navigate to ='/' />}/>
 <Route path='/write' element={user?<Write/>:<Navigate to ='/register' />}/>
 <Route path='/register' element={!user?<Register/>:<Navigate to ='/' />}/>
 <Route path='/posts/:post_id' element={<Singlepost/>}/>
</Routes>
</Router>
    
  )
}

export default App