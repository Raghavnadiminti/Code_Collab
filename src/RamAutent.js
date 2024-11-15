const express=require('express') 
const mongo=require('mongoose') 
const cookie=require('cookie-parser') 
const cors=require('cors') 
const bcrypt =require('bcryptjs') 
const jwt=require('jsonwebtoken') 

const app=express() 
app.use(cookie())
app.use(express.json()) 
app.use(cors({
    origin:true,
    methods:['GET','POST'],
    allowedHeaders:['Content-Type'],
    credentials:true

})) 
mongo.connect("mongodb://localhost:27017/") 

const userScheema=mongo.Schema({name:String,password:String}) 
const userCollection=mongo.model('User',userScheema);

app.post('/signup',async (req,res)=>{
    const {username,password,email}=req.body ;
    const userFlag=await userCollection.findOne({name:username}) 
    if(!userFlag){
    const hpass= await bcrypt.hash(password,10)
    const userData=new userCollection({name:username,password:hpass})
    try{
        console.log("saved",username,password,hpass)
         userData.save()
        res.status(201).send('saved')
    }
    catch(err){
        console.log(err)
        res.status(500).send('err')
    }
    }
    else{
        res.status(409).send("user exist")
    }


})
app.post('/login',async (req,res)=>{

    const {username,password}=req.body;
    const userData=await userCollection.findOne({name:username}) 
    if(!userData){
       return  res.status(400).send('no user found')
    }
    if(userData){
    const passCheck=await bcrypt.compare(password,userData.password) 
    
    if(!passCheck){
       return  res.status(401).send('not correct password')
    }

} 
  
    //just a simple project so no .env file self sorry
    const token=jwt.sign({username},'Raghavendra',{expiresIn:'168h'}); 

    res.cookie('PassToken',token,{httpOnly:true,sameSite:'strict'}) 
    res.send(true)
  
})
app.get('/Verify',(req,res)=>{
    const token=req.cookies.PassToken;
    console.log(token,"verify called")
    if(!token){
       return res.send(false)
    }

    try{
    const tokenCheck=jwt.verify(token,'Raghavendra') 
    console.log("verified",token)
    res.send(true)
    }
    catch(err){
        console.log(err)
        res.send(false)
    }

})
app.listen(7000,()=>{console.log("jwt done")})