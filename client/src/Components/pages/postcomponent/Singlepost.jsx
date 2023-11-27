import React from "react";
import {Link} from 'react-router-dom'
import "./post.css";
const Singlepost = (props) => {
  return (
    <div className="post">
      <div className="singlepost">
      <Link to={`/${props.id}`}>
        <img
          src={`http://localhost:4000/${props.image}`}
          alt=""
          className="singleimg"
        />
        </Link>
          <Link to={`/${props.id}`}>
        <span className="title" style={{fontSize:"4.5vh",fontFamily:"Josefin Sans",marginLeft:"2px",fontWeight:"400"}} >{props.title}</span>
        </Link>
      </div>
    </div>
  );
};

export default Singlepost;
