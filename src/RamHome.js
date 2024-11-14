import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEditor } from 'slate';
import './App.css'; 
import {useState,useMemo,useRef} from 'react'


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
const keyRef=useRef()
const navigate=useNavigate()

function handleSubmit(e){
const key=keyRef.current.value
navigate(`/${key}`)
    

}
        return(
            <>
            <label>Enter passKey of session </label>
            <input type="text" ref={keyRef}></input>
            <button onClick={handleSubmit}>Submit</button>

            </>
        )
  
        
}
function CreateSession(){
        const inpt1=useRef();
        const inpt2=useRef();
        const inpt3=useRef();
        const inpt4=useRef();
        const navigate=useNavigate()
         function handleSubmit(){
                const name=inpt3.current.value;
                navigate(`/${name}`)
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