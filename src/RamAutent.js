const express=require('express') 
const mongo=require('mongoose') 
const cookie=require('cookie-parser') 
const cors=require('cors') 
const bcrypt =require('bcryptjs') 
const jwt=require('jsonwebtoken') 

const app=express() 
app.use(express.json()) 
app.use(cors({
    origin:'*',
    methods:['GET','POST'],
    allowedHeaders:['Content-Type']

})) 
mongo.connect("mongodb://localhost:27017/") 

const userScheema=mongo.Schema({name:String,password:String}) 
const userCollection=mongo.model('User',userScheema);

app.post('/signup',async (req,res)=>{
    const {username,password,email}=req.body ;
    const userFlag=await userCollection.findOne({name:username}) 
    if(!userFlag){
    const hpass= await bcrypt.hash(password,10)
    const userData=new userCollection({username,hpass})
    try{
        await userData.save()
        res.status(201).send('saved')
    }
    catch(err){
        res.status(500).send('err')
    }
    }
    else{
        res.status(409).send("user exist")
    }


})
app.get('/login',async (req,res)=>{

    const {username,password}=req.body;
    const userData=await userCollection.findOne({name:username}) 
    if(!userData){
        res.status(120).send('no user found')
    }
    const passCheck=bcrypt.compare(password,userData.password) 
    if(!passCheck){
        res.status(400).send('not correct password')
    }
    //just a simple project so no .env file self sorry
    const token=jwt.sign({username},'Raghavendra',{expiresIn:'168h'}); 

    res.cookie('PassToken',token,{httpOnly:true,sameSite:'strict'}) 
    res.send(true)
})
app.get('/Verify',(req,res)=>{
    const token=req.cookies.PassToken;

    if(!token){
        res.status(400).send('invalid token')
    }

    try{
    const tokenCheck=jwt.verify(token,'Raghavendra') 
    res.send(true)
    }
    catch(err){
        res.status(400).send('invalid token')
    }

})
app.listen(7000,()=>{console.log("jwt done")})