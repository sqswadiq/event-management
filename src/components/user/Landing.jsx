import React from 'react'
import './Landing.css'
import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate=useNavigate()
  const handleNavigate=()=>{
    navigate("/userevents")
  }
  return (
    <div className=''> 
      <div className='parent-container d-flex flex-column justify-content-center align-items-start ps-5'>
        <div className='contents'>
          <h2 className='text-light libre-baskerville-bold ps-5'>Where Every Event Turns Into A Lasting Memory</h2>
          <button onClick={handleNavigate} className='btn landingbtn ms-5 fs-4'>Explore Now &nbsp;
          <i class="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Landing