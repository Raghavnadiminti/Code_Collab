const express=require('express') 
const http=require('http')
const socket=require('socket.io') 
const app=express() 
const cors=require('cors')
app.use(express.json())
app.use(cors({
    origin:'*',
    methos:['GET','POST'],
    allowedHeaders:['Content-Type'],
    credentials:true
}))
const server=http.createServer(app)
const io=socket(server,{cors: {origin:'*',
    methos:['GET','POST'],
    allowedHeaders:['Content-Type'],
    credentials:true}})
io.on('connection',(socket)=>{
    socket.on('change',(docData)=>{
        socket.broadcast.emit('change',docData)
    })
     socket.on('disconnect',()=>{console.log("disconnected")})
})


server.listen(8000,()=>{console.log("connected")})
