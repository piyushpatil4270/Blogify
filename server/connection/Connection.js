const mongoose=require("mongoose")

const connection=async()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/Mernblogs")
    .then(()=>console.log("SERVER connected to mongoDB "))
.catch((err)=>console.log("ERROR:",err))
}
module.exports=connection