import React, { useEffect } from 'react';
import axios from 'axios';
import { createEditor } from 'slate';
import './App.css'; 
import { useNavigate } from 'react-router-dom';
import {useState,useMemo,useRef} from 'react'

export default function Login(){
       const username=useRef(null) 
    const password=useRef(null) 
    const email=useRef(null)
    const Navigate=useNavigate();
    const [isValid,setValid]=useState(false)
   function handleSubmit(){
       const user=username.current.value 
       const pass = password.current.value
     
       const mail=email.current.value 
       console.log(user)
       axios.post('http://localhost:7000/login',{username:user,password:pass},{withCredentials:true}).then((res)=>{
        if(res.data){
              Navigate('/')
        }
       }).catch((err)=>{console.log(err)})




   }

       return(



                   <>
                   <div id="signinform">
                         <h1 align="center">CODE_COLLAB</h1>
                         <div className="credentials"></div>
                         <div className='Container'>
                      <label>username</label>   <input type="text" ref={username}></input>
                     <label>Email </label>    <input type="email" ref={email}></input>
                     <label>Password</label>  <input type="password" ref={password}></input>
                     <button onClick={handleSubmit}>SignIn</button>
                     </div>


                   </div>
                   
                   
                   
                   
                   </>





       )
}