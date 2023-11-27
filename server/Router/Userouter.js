const express = require("express");
const USERS = require("../model/model");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "Uploads" });
const fs = require("fs");
const BLOGS = require("../model/blogs");

const secret = "hhdsijwkjdnhdhbsbbs";

const salt = bcrypt.genSaltSync(10);

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await USERS.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json({ Requestdata: user });
  } catch (error) {
    res.json({ ERROR: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await USERS.findOne({ username });
    const passed = bcrypt.compareSync(password, user.password);
    if (passed) {
      const token = jwt.sign({ username, id: user.id }, secret);
      res.cookie("token", token).json({
        id: user._id,
        username,
      });
    } else {
      alert("WRONG CREDENTIALS");
    }
  } catch (error) {
    res.status(404).json({ ERROR: error });
  }
});

router.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (error, info) => {
      if (error) throw error;
      res.json(info)
    });
  } catch (error) {
    res.status(404).json({ ERROR: error });
  }
});

router.post("/logout", async (req, res) => {
  res.cookie("token", "").json({ State: "logged out" });
});

router.post(
  "/createpost",
  uploadMiddleware.single("file"),
  async (req, res) => {
    try {
      const { token } = req.cookies;
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newpath = path + "." + ext;
      fs.renameSync(path, newpath);
      jwt.verify(token, secret, {}, async (error, info) => {
        if (error) throw error;
        const { title, content } = req.body;
        const post = await BLOGS.create({
          title,
          content,
          cover: newpath,
          author: info.id,
        });
        res.json(post)
      });
    } catch (error) {
      res.json({ERROR:error})
    }
  }
);

router.get("/allposts",async(req,res)=>{
  try {
  const allposts=await BLOGS.find({})
  res.json(allposts)
} catch (error) {
    res.json({ERROR:error})
  }
})

router.get("/getpost/:id",async(req,res)=>{
 try {
  const id=req.params.id
  const post=await BLOGS.findOne({_id:id})
  res.json(post)
  } catch (error) {
    res.json({ERROR:error})
  }
})

router.put("/editpost",uploadMiddleware.single("file"),async(req,res)=>{
 try {
  let newpath=null
 if(req.file){
  const  {originalname,path}=req.file
  const parts=originalname.split('.')
  const ext=parts[parts.length-1]
   newpath=path+'.'+ext
   fs.renameSync(path,newpath)
 }
 const{title,id,content}=req.body
 const post=await BLOGS.findOne({_id:id})
 await BLOGS.updateOne({_id:id},{ $set:{title:title,content:content,cover:newpath?newpath:post?.cover}})
    
 res.json("updated")
  
  } catch (error) {
    res.json({ERROR:error})
  }
})

router.delete("/delete/:id",async(req,res)=>{
  try {
  const {id}=req.params
  const post= await BLOGS.deleteOne({_id:id})
  res.json("deleted")
} catch (error) {
    res.json({ERROR:error})
  }
})

module.exports = router;
