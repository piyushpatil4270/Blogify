import React, { useState } from 'react'
import './write.css'
import { useNavigate } from 'react-router-dom'
const Write = () => {
  const[title,settitle]=useState("")
  const[content,setcontent]=useState("")
  const[file,setfile]=useState("")
  const[redirect,setredirect]=useState(false)
  const navigate=useNavigate()
  const createpost=async(e)=>{
    const data=new FormData()
    data.set("title",title)
    data.set("content",content)
    if(file){
      data.set("file",file[0])
    }
  
    e.preventDefault();
   const response= await fetch("http://localhost:4000/user/createpost",{
      method:"POST",
      body:data,
      credentials:"include"
    })
    if(response.ok){
      setredirect(true)
    }

  }
  if(redirect){
    navigate("/")
  }
    return (
    <div className='write'>
        <form className="writeform" onSubmit={createpost}>
            <div className="writeformgroup">
               <label htmlFor='fileinput'>
               <i className="addicon  fa-solid fa-plus "></i>
               </label>
                <input type='file' id='fileinput' style={{display:"none"}} onChange={(e)=>setfile(e.target.files)}/>
                <input type='text texttitle' placeholder='Title'  className='writeinput'onChange={(e)=>settitle(e.target.value)} />
                
            </div>
            <div className="writeformgroup">
            <textarea  className='writeinput writetext' placeholder='Tell your story...'  rows="5" onChange={((e)=>setcontent(e.target.value))}></textarea>
            </div>
            <button className="writesubmit">ADD</button>
        </form>
      
    </div>
  )
}

export default Write
