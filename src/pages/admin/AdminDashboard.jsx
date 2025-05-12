import React, { useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx";
import { LuUsersRound } from "react-icons/lu";
import { MdEvent } from "react-icons/md";
import { LuTickets } from "react-icons/lu";
import { FaMoneyCheckAlt } from "react-icons/fa";



function AdminDashboard() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/admindashboard/dashboard')
  }, [])


  const handleLogout = () => {
    
    sessionStorage.clear();
    navigate('/login');
  }
  return (
    <div className='row m-0 full_height'>
      <div className="col-lg-2 thirdbg py-3 ps-0 me-4 position-relative" style={{minHeight:"500px"}}>
        <h2 className='thirdcoloradmin ps-4'>Admin Panel</h2>
        <hr className='w-100 thirdcoloradmin mt-4 mb-3' />
        <div className='d-flex flex-column fs-4'>
          <NavLink className={({ isActive }) => `text-decoration-none thirdcoloradmin my-1 d-flex align-items-center py-2 ps-4  ${isActive && 'activelink'}`} to={'/admindashboard/dashboard'}><RxDashboard className='me-2' />Dashboard</NavLink>
          <NavLink className={({ isActive }) => `text-decoration-none thirdcoloradmin my-1 d-flex align-items-center py-2 ps-4  ${isActive && 'activelink'}`} to={'/admindashboard/allusers'}><LuUsersRound className='me-2' />Users</NavLink>
          <NavLink className={({ isActive }) => `text-decoration-none thirdcoloradmin my-1 d-flex align-items-center py-2 ps-4  ${isActive && 'activelink'}`} to={'/admindashboard/allevents'}><MdEvent className='me-2' />Events</NavLink>
          <NavLink className={({ isActive }) => `text-decoration-none thirdcoloradmin my-1 d-flex align-items-center py-2 ps-4  ${isActive && 'activelink'}`} to={'/admindashboard/allbookings'}><LuTickets className='me-2' />Bookings</NavLink>
          <NavLink className={({ isActive }) => `text-decoration-none thirdcoloradmin my-1 d-flex align-items-center py-2 ps-4  ${isActive && 'activelink'}`} to={'/admindashboard/allpayments'}><FaMoneyCheckAlt className='me-2' />Payments</NavLink>
        </div>
        <div className='ps-4 position-absolute bottom-0 mb-5'>
          <button className='btn btn-outline-light fs-5' onClick={handleLogout}>
            <i class="fa-solid fa-arrow-right-from-bracket fa-rotate-180 me-2 "></i>
            Logout</button>
        </div>
      </div>
      <div className="col-lg-9 primarybg border rounded shadow my-4 p-0 ">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard