const express=require('express') 
const mong=require('mongoose') 
const socket=require('socket.io') 
const http=require('http') 
const cors=require('cors') 

const app=express()
app.use(express.json())
app.use(cors({
    origin:'*',
    methods:['POST','GET'],
    allowedHeaders:['Content-Type'],
    credentials:true
}))
const server=http.createServer(app) 
const io=socket(server,{cors:{
    origin:'*',
    methods:['POST','GET'],
    allowedHeaders:['Content-Type'],
    credentials:true
}})
io.on('connection',(socket)=>{ 
         socket.on('chat',(data)=>{
            socket.emit('chat',data)
         })
         socket.on('disconnect',()=>{console.log("disconnected")})
}) 


server.listen(9000,()=>{console.log("chat now")})

