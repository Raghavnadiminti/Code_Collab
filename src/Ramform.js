import React, { useEffect } from 'react';

import { createEditor } from 'slate';
import './App.css'; 
import {useState,useMemo} from 'react'

export default function Signin(){
      


       return(



                   <>
                   <div id="signinform">
                         <h1 align="center">CODE_COLLAB</h1>
                         <div className="credentials"></div>
                         <div className='Container'>
                      <label>username</label>   <input type="text"></input>
                     <label>Email </label>    <input type="email"></input>
                     <label>Password</label>  <input type="password"></input>
                     <button>SignIn</button>
                     </div>


                   </div>
                   
                   
                   
                   
                   </>





       )
}