import React, { useEffect, useState } from 'react'
import UserHeader from './UserHeader'
import Table from 'react-bootstrap/Table';
import { userBookingAPI } from '../../services/allAPI';
import UserFooter from './UserFooter';

function Booking() {
  const [booking, setBooking] = useState([])
  console.log(booking, "inside Booking");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    getUserBooking()
  }, [])


  const getUserBooking = async () => {
    try {
      const result = await userBookingAPI(userId)

      if (result.status == 200) {
        setBooking(result.data)
      }
    } catch (error) {
      console.log(error);

    }

  }
  return (
    <>
      <UserHeader />

     <div className='bgimg py-5' style={{minHeight:"300px"}}>
        <div className="container mt-5 pt-5 content">
          {booking?.length > 0 ?
            <div>
              <h3 className='primarycolor pt-3 text-center '>All Bookings</h3>
  
              <Table striped className='custom-table '>
                <thead>
                  <tr>
                    <th>#</th>
                    <th className='fw-bold'>Event Name</th>
                    <th className='fw-bold'>Event Date</th>
                    <th className='fw-bold'>Event Time</th>
                    <th className='fw-bold'>Event Place</th>
                    <th className='fw-bold'>Ticket No</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    booking?.map((item,index) => (
                      <tr>
                        <td>{index+1}</td>
                        <td>{item?.eventName}</td>
                        <td>{item?.eventDate}</td>
                        <td>{item?.eventTime}</td>
                        <td>{item?.eventPlace}</td>
                        <td className='fw-bold text-success-emphasis'>{item?.ticketNo}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </div>
            :
            <div className='text-danger-emphasis text-danger'>No Booking Found!</div>
          }
        </div>
     </div>

     <UserFooter/>
    </>
  )
}

export default Booking