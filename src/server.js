const express=require('express') 
const http=require('http')
const socket=require('socket.io') 
const app=express() 
const cors=require('cors')
const mongoose=require('mongoose')
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
mongoose.connect('mongodb://localhost:27017/') 

const scheema=mongoose.Schema({
    RoomName:String,
    passkey:String
})
const Rooms=mongoose.model('room',scheema)






app.post('/update',async (req,res)=>{
    const {RoomName,passkey}=req.body;
    console.log(RoomName,passkey)
    const key=await Rooms.findOne({RoomName:RoomName}) 
    if(key){
                res.send(false)
    }
    else{
        const room = new Rooms({RoomName:RoomName,passkey:passkey}) 
        room.save();
        res.send(true)
    }



})
app.post('/Roomcheck',async (req,res)=>{
    const {RoomName,passkey}=req.body; 
    const key=await Rooms.findOne({RoomName:RoomName,passkey:passkey})
    if(key){
        res.send(true)
    }
    else{
        res.send(false)
    }
})
server.listen(8000,()=>{console.log("edit code now")})
