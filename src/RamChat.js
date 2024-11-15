import React, { useEffect } from 'react';

import { createEditor } from 'slate';
import './App.css'; 
import {useState,useMemo,useRef} from 'react'

import { io } from 'socket.io-client'; 
 const socket=io('http://localhost:9000')

export default function ChatSession(){
    const [messages,setMsgs]=useState("")
   
            useEffect(()=>{
                socket.on('chat',(msgs)=>{setMsgs(msgs)})
            },[])
        function handleclick(){
            socket.emit('chat',"hii frnds")
        }
          return(<>
            <div>{messages}</div> 
            <input placeholder="comment on it "></input><button onClick={handleclick}>Send</button>
            
            
            
            </>)
}
