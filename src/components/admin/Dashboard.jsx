import React, { useContext } from 'react'
import '../../pages/admin/Admin.css'
import { allBookingCountContext, allEventCountContext, allPaymentCountContext, allUserCountContext } from '../../context/ContextAPI'


function Dashboard() {
  const{allEventCount}=useContext(allEventCountContext)
  const{allUserCount}=useContext(allUserCountContext)
  const{allBookingCount}=useContext(allBookingCountContext)
  const{allPayment}=useContext(allPaymentCountContext)
  
  return (
    <div className=''>
        <h2 className='thirdbg rounded-top thirdcoloradmin ps-3 fs-2 py-2'>Dashboard</h2>

        <div className='d-flex flex-wrap p-5 justify-content-center align-items-center'>
          <div className='shadow rounded text-center p-5 m-2' style={{maxWidth:"200px"}}>
          <i class="fa-solid fa-users fs-1 secondarycolor"></i>
          <h3 className='fs-2 my-2 secondarycolor'>Total Users</h3>
          <h3 className='fs-2 text-danger-emphasis'>{allUserCount}</h3>
          </div>
          <div className='shadow rounded text-center p-5 m-2' style={{maxWidth:"200px"}}>
          <i class="fa-solid fa-drum fs-1 secondarycolor"></i>
          <h3 className='fs-2 my-2 secondarycolor'>Total Events</h3>
          <h3 className='fs-2 text-danger-emphasis'>{allEventCount}</h3>
          </div>
          <div className='shadow rounded text-center p-5 m-2' style={{maxWidth:"200px"}}>
          <i class="fa-solid fa-ticket fs-1 secondarycolor"></i>
          <h3 className='fs-2 my-2 secondarycolor'>Total Bookings</h3>
          <h3 className='fs-2 text-danger-emphasis'>{allBookingCount}</h3>
          </div>
          <div className='shadow rounded text-center p-5 m-2' style={{maxWidth:"200px"}}>
          <i class="fa-solid fa-sack-dollar fs-1 secondarycolor"></i>
          <h3 className='fs-2 my-2 secondarycolor'>Total Revenue</h3>
          <h3 className='fs-2 text-danger-emphasis'>{allPayment}</h3>
          </div>
        </div>
    </div>
  )
}

export default Dashboard