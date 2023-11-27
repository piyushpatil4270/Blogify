import React, { useState } from "react";
import "./register.css";
const Authregister = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const register=async(e)=>{
     e.preventDefault()
     await fetch("http://localhost:4000/user/register",{
      method:"POST",
      body:JSON.stringify({username,password}),
      headers:{"Content-Type": "application/json" }
     });
     setusername("")
     setpassword("")
  }
  return (
    <div className="register">
      <div className="head">
        <h3 className="registerhead">REGISTER</h3>
      </div>

      <form className="registerform" onSubmit={register}>
        <span className="label">Username</span>
        <input
          className="input"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <span className="label">Password</span>
        <input
          className="input"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button className="registerbutton" onClick={register}>Register</button>
      </form>
    </div>
  );
};

export default Authregister;
