import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Usercontext } from "../pages/Usercontext";
const Navbar = () => {
 const navigate=useNavigate()
  const { userinfo, setuserinfo } = useContext(Usercontext);
  const[redirect,setredirect]=useState(false)
  useEffect(() => {
    fetch("http://localhost:4000/user/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userinfo) => {
        setuserinfo(userinfo);
      });
    });
  }, []);
  const logout=async()=>{
    const response=fetch("http://localhost:4000/user/logout",{
      method:"POST",
      credentials:"include"
    })
    setuserinfo(null)
    
  }
  
  
  const username=userinfo?.username
  return (
    <div className="navbar">
      <div className="topleft">
        <Link to="https://www.facebook.com">
          <i className="topicon fa-brands fa-square-facebook"></i>
        </Link>
        <Link to="https://www.twitter.com">
          <i className="topicon fa-brands fa-square-twitter"></i>
        </Link>
        <Link to="https://www.pinterest.com">
          <i className="topicon fa-brands fa-square-pinterest"></i>
        </Link>
        <Link to="https://www.instagram.com">
          <i className="topicon fa-brands fa-square-instagram"></i>
        </Link>
      </div>
      {username && (
        <div className="topcenter">
          <ul className="toplist">
            <li className="toplistitem">
              {" "}
              <Link to="/">HOME</Link>{" "}
            </li>
            <li className="toplistitem">
              <Link to="/createpost">WRITE</Link>{" "}
            </li>
            <li className="toplistitem">
              {" "}
              <Link onClick={logout} >LOGOUT</Link>
            </li>
          </ul>
        </div>
      )}
      {!username && (
        <div className="topcenter">
          <ul className="toplist">
            <Link to="/login">
              <li className="toplistitem">LOGIN</li>
            </Link>
            <Link to="/register">
              <li className="toplistitem">REGISTER</li>
            </Link>
          </ul>
        </div>
      )}
      <div className="topright">
        <i className="topsearchicon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
};

export default Navbar;
