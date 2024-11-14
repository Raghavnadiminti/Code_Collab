import React, { useEffect } from 'react';

import { createEditor } from 'slate';
import './App.css'; 
import {useState,useMemo,useRef} from 'react' 
import TextEditor from './RamText.js';
import ChatSession from './RamChat.js'; 

export default function Session(){



    return(
        <>
        <div id="TextContainer">
               <TextEditor/>
               <ChatSession/>
        </div>
        
        </>

    )
}