import React, { useContext, useEffect, useState } from "react";
import "./postdisplay.css";
import { useNavigate, useParams } from "react-router-dom";
import { Usercontext } from "../Usercontext";
const Postdisplay = () => {
  const { id } = useParams();
  const [blog, setblog] = useState();
  const { userinfo } = useContext(Usercontext);
  const[redirect,setredirect]=useState(false)
  const navigate=useNavigate()
  useEffect(() => {
    fetch(`http://localhost:4000/user/getpost/${id}`, {
      method: "get",
      credentials: "include",
    }).then((response) => {
      response.json().then((blog) => {
        setblog(blog);
      });
    });
  }, [id]);
  const editpost=()=>{
    navigate(`/editpost/${id}`)
  }
  const deletepost=async(e)=>{
    e.preventDefault()
   const response= fetch(`http://localhost:4000/user/delete/${id}`,{
      method:"delete",
     
    })
    setredirect(true)
  }
  if(redirect){
    navigate("/")
  }
  return (
    <div className="displaypost">
      <div className="titlecontainer">
        <span className="posttitle">{blog?.title}</span>
      </div>
      <div className="imagecontainer">
        <img
          className="postimage"
          src={`http://localhost:4000/${blog?.cover}`}
          alt=""
        />
      </div>

      <div className="contentcontainer">
        <span className="postcontent">{blog?.content}</span>
        <div className="editbutton">
          {JSON.stringify(userinfo?.id) === JSON.stringify(blog?.author) && (
            <div className="btndiv">
            <button className="editbtn" onClick={editpost}>edit</button>
            <button className="dltbtn" onClick={deletepost}>delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Postdisplay;
