import React, { useEffect, useState } from "react";
import "./posts.css";
import Singlepost from "../postcomponent/Singlepost";
const Posts = () => {
  const[blogs,setblogs]=useState([])
  useEffect(() => {
    fetch("http://localhost:4000/user/allposts")
    .then((response)=>{
      response.json().then((allposts)=>{
        setblogs(allposts)
      })
    })
  }, []);
  console.log(blogs)
  return (
    <div className="posts">
     {blogs &&  blogs.map((blog)=>{
      return  <Singlepost title={blog.title} id={blog._id} image={blog.cover} content={blog.content} />
     })}
    </div>
  );
};

export default Posts;
