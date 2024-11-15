import React, { useEffect } from 'react';
import axios from 'axios';
import { createEditor } from 'slate';
import './App.css'; 
import {useState,useMemo,useRef} from 'react'

export default function Signin(){
    const [flag,setFlag]=useState(false)
       const username=useRef(null) 
    const password=useRef(null) 
    const email=useRef(null)
   function handleSubmit(){
       const user=username.current.value 
       const pass = password.current.value
       const mail=email.current.value 
       try{
       axios.post('http://localhost:7000/signup',{username:user,password:pass,email:mail}).then((res)=>{console.log(res.data)}).catch((err)=>{setFlag(true)})
       }
       catch(err){
           setFlag(true)
       }

   }

       return(



                   <>
                   <div id="signinform">
                         <h1 align="center">CODE_COLLAB</h1>
                         <div className="credentials"></div>
                         <div className='Container'>
                      <label>username</label>   <input type="text" ref={username} onChange={()=>{setFlag(false)}}></input>
                      {flag?<p>username Taken</p>:<></>}
                     <label>Email </label>    <input type="email" ref={email}></input>
                     <label>Password</label>  <input type="password" ref={password}></input>
                     <button onClick={handleSubmit}>SignIn</button>
                     </div>


                   </div>
                   
                   
                   
                   
                   </>





       )
}