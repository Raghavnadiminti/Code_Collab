import React, { useEffect } from 'react';
import axios from 'axios';
import { createEditor } from 'slate';
import './App.css'; 
import {useState,useMemo} from 'react'

export default function login(){
       const username=useRef(null) 
    const password=useRef(null) 
    const email=useRef(null)
   function handleclick(){
       const user=username.current.value 
       const pass = password.current.value
       const mail=email.current.value 
     

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