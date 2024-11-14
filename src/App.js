import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,Route,Routes,Navigate
} from 'react-router-dom';
import './App.css'; 
import {useState,useMemo} from 'react'
import Login from './RamLogin.js';
 import TextEditor from './RamText.js';
 import ChatSession from './RamChat.js';
import Signin from './Ramform.js';
import Home from './RamHome.js';
import Session from './RamSession.js';
import Cookies from 'js-cookie'
import axios from 'axios';
function PrivateRoute({children}){

 
  const [flag,setFlag]=useState(false)
  useEffect( ()=>{
    const cookie=Cookies.get('PassToken');
    try{
     axios.get('http://localhost:7000/Verify',{withCredentials:true}).then( (res)=>{
      console.log(res.data,"axios")
    setFlag(res.data)}).catch(err=>console.log(err))
    }
     catch(err){
      console.log(err)
     }
    },[])
    useEffect(()=>{
      console.log(flag,"pr")
    },[flag])
   

  return flag?children:<Navigate to="/login"/>
}


export default function App(){



  
  return(
    <>


    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}> </Route>
                        
                            <Route path="/" element={
                            
                              <Home/>
                              
                            }>  </Route>
                            <Route path="/:name" element={
                           <PrivateRoute>
                              <Session/>
                              </PrivateRoute>
                              
                              }></Route>


      </Routes>
    </Router>

    </>
  )


}
