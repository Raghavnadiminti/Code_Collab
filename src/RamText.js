import React, { useEffect } from 'react';

import { createEditor } from 'slate';
import './App.css'; 
import {useState,useMemo} from 'react'
import MonacoEditor from'@monaco-editor/react';
import { io } from 'socket.io-client';
const socket=io('http://localhost:8000')
export default function CodeEditor(){
           const [value,setValue]=useState("start here")
           function handleChange(val){
               
               setValue(val)
               socket.emit('change',value)

           }
           useEffect(()=>{
                   socket.on('change',(value)=>{setValue(value)})
                   console.log(value)
                   return ()=>{socket.off('change')}
           },[])

    return(<>
        <MonacoEditor   
        width="110vh"
        height="900vh"
        language="python"
        theme="vs-dark"
        value={value}
        onChange={handleChange}
    />
    {value}
    </>
    )
}