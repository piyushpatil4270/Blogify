const express=require("express");
const connection=require("./connection/Connection")
const cookieparser=require("cookie-parser")
const cors=require("cors")
const userrouter=require("./Router/Userouter")
const app=express()

const port=4000;

connection()

app.use(cors({credentials:true,origin:'http://localhost:3000'}))
app.use(express.json())
app.use(cookieparser())
app.use(express.json())
app.use('/Uploads',express.static(__dirname+'/Uploads'))

app.get("/",(req,res)=>{
    res.send("SERVER STARTED")
})

app.use("/user",userrouter)




app.listen(port,()=>{
    console.log(`SERVER started at port ${port}`)
})