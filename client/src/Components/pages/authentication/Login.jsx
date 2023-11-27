import React, { useContext, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../Usercontext";
const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
   const[redirect,setredirect]=useState(false)
  const{setuserinfo}=useContext(Usercontext)
   const navigate=useNavigate()
   const login = async () => {
   const response=await fetch("http://localhost:4000/user/login", {
      method: "POST",
      body:JSON.stringify({username,password}),
      headers: { "Content-Type": "application/json" },
      credentials:"include"
    });
    setusername("  ")
    setpassword(" ")
    
    if(response.ok){
      response.json().then((userinfo) => {
        setuserinfo(userinfo)
        setredirect(true)
    })
  };
   
   
  }
  if(redirect){
    navigate("/")
  }
  
  return (

    <div className="register">
      <div className="head">
        <h3 className="registerhead">LOGIN</h3>
      </div>

      <form className="registerform" onSubmit={login}>
        <span className="label">Username</span>
        <input className="input" value={username} onChange={(e)=>setusername(e.target.value)} />
        <span className="label">Password</span>
        <input className="input" value={password} onChange={(e)=>setpassword(e.target.value)} />

        <button className="loginbutton" onClick={login}>Login</button>
      </form>
    </div>
  );
  

};

export default Login;
