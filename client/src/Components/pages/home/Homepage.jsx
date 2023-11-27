import React from 'react'
import Header from '../../header/Header'
import Posts from '../posts/Posts'
import "./homepage.css"
const Homepage = () => {
  return (
    <>
      <Header/>
      <div >
       <Posts/>
      </div>
    </>
  )
}

export default Homepage
