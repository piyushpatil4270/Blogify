const {Schema}=require("mongoose")
const {model}=require("mongoose")

const blogSchema= Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    cover:{
        type:String,
        
    },
    author:{
        type:String
    }
})

const BLOGS= model("Blogs",blogSchema)

module.exports=BLOGS