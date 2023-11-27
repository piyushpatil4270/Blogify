const {Schema,model}=require("mongoose")

const userSchema=Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const USERS=model("blogusers",userSchema)

module.exports=USERS