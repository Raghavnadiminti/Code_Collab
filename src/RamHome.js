import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEditor } from 'slate';
import './App.css'; 
import {useState,useMemo,useRef} from 'react'
import axios from 'axios';

export default function Home(){
     
         const [inputFlag,setInputFlag]=useState(false)
         const [host,setHost]=useState(false)
         
         function handleSession(){
                 setInputFlag(true)
         }
         function handleHost(){
                  setHost(true)
         }

        return(
                <>
                <button onClick={handleSession}>Join session</button> 
                <button onClick={handleHost}>create session</button> 

             {inputFlag?<JoinSession/>:<></>}
             {host?<CreateSession/>:<></>}
                
                
                </>


        )
}

function JoinSession(){
const inpt1=useRef();
const inpt2=useRef();
const navigate=useNavigate()

async  function handleSubmit(e){
const roomname=inpt1.current.value
const passkey=inpt2.current.value 
let k= false
await axios.post('http://localhost:8000/RoomCheck',{RoomName:roomname,passkey:passkey}).then((res)=>{k=res.data})
 if(k){
navigate(`/${roomname}`)
 } 

}
        return(
            <>
            <label>enter session passkey</label>
                <input type="text" ref={inpt2}></input>
                <label>enter name of session</label>
                <input type="text" ref={inpt1}></input>
                <button onClick={handleSubmit}>Join</button>

            </>
        )
  
        
}
function CreateSession(){
        const inpt1=useRef();
        const inpt2=useRef();
        const inpt3=useRef();
        const inpt4=useRef();
        const navigate=useNavigate()
      async    function handleSubmit(){
                const name=inpt3.current.value;
                const passkey=inpt2.current.value
                let k=false 
             await   axios.post('http://localhost:8000/update',{RoomName:name,passkey:passkey}).then((res)=>{k=res.data}) 
                if(k){
                navigate(`/${name}`)
                }
                console.log(k)
         }

         return(
              <>
              <div>
                <label>enter language</label>
                <input type="text" ref={inpt1}></input> 
                <label>enter session passkey</label>
                <input type="text" ref={inpt2}></input>
                <label>enter name of session</label>
                <input type="text" ref={inpt3}></input>
                <button onClick={handleSubmit}>Host</button>
              </div>
              
              
              </>


         )
}