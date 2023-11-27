import React, { useEffect, useState } from 'react'
import "./editpost.css"
import { useNavigate, useParams } from 'react-router-dom'
const Editpost = () => {
const[title,settitle]=useState("")
const[content,setcontent]=useState("")
const[files,setfiles]=useState("")
const{id}=useParams()
const [redirect,setredirect]=useState(false)
const navigate=useNavigate()
 useEffect(()=>{
  fetch(`http://localhost:4000/user/getpost/${id}`,{
    method:"get"
  })
  .then((response)=>{
    response.json()
    .then((blog)=>{
      settitle(blog?.title)
      setcontent(blog?.content)
    })
  }) 
},[])
 
async function submit(e){
  e.preventDefault()
  const formdata= new FormData()
  formdata.set("title",title)
  formdata.set("content",content)
  formdata.set("id",id)
  if(files?.[0]){
    formdata.set("file",files[0])
  }
 const response= await fetch("http://localhost:4000/user/editpost",{
    method:"PUT",
    body:formdata
  })
  if(response?.ok){
    setredirect(true)
  }
}
if(redirect){
 navigate(`/${id}`)
}
return (
    <div className='write'>
    <form className="writeform" onSubmit={submit}>
        <div className="writeformgroup">
           <label htmlFor='fileinput'>
           <i className="addicon  fa-solid fa-plus "></i>
           </label>
            <input type='file' id='fileinput' onChange={((e)=>setfiles(e.target.files))} style={{display:"none"}}/>
            <input type='text texttitle' placeholder='Title' value={title} onChange={(e)=>settitle(e.target.value)} className='writeinput' />
            
        </div>
        <div className="writeformgroup">
        <textarea  className='writeinput writetext' placeholder='Tell your story...' value={content}  onChange={(e)=>setcontent(e.target.value)} rows="5"></textarea>
        </div>
        <button className="writesubmit" onClick={submit}  >EDIT</button>
    </form>
  
</div>
  )
}

export default Editpost
