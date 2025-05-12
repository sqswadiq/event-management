import React, { useContext, useEffect, useState } from 'react'
import '../../pages/admin/Admin.css'
import Table from 'react-bootstrap/Table';
import { MdDeleteForever } from "react-icons/md";
import { allBookingAPI, deleteBookingAPI } from '../../services/allAPI';
import { allBookingCountContext } from '../../context/ContextAPI';




function AllBookings() {
  const [booking, setBooking] = useState([])
  console.log(booking, "inside Admin All Booking");

  const { setAllBookingCount } = useContext(allBookingCountContext)

  useEffect(() => {
    getAllBookings()
  }, [])


  const getAllBookings = async () => {
    try {
      const result = await allBookingAPI()

      if (result.status == 200) {
        setBooking(result.data)
        setAllBookingCount(result.data.length)
      }
    } catch (error) {
      console.log(error);

    }

  }

  const handleDelete = async (id) => {
    await deleteBookingAPI(id)
    getAllBookings()

  }

  return (
    <div className='w-100'>
      <h2 className='thirdbg rounded-top thirdcoloradmin ps-3 fs-2 py-2'>All Bookings</h2>
      
      <div className='overflowscroll'>
        {booking?.length > 0 ?
          <div>
            <Table className='mt-5 w-100' striped bordered hover>
              <thead>
                <tr>
                  <th className='fw-bold'>#</th>
                  <th className='fw-bold'>User Name</th>
                  <th className='fw-bold'>Event Name</th>
                  <th className='fw-bold'>Event Date</th>
                  <th className='fw-bold'>Event Time</th>
                  <th className='fw-bold'>Event Place</th>
                  <th className='fw-bold'>Ticket No</th>
                  <th className='fw-bold'>Action</th>
                </tr>
              </thead>
              <tbody>
                {booking?.map((item, index) => (
                  <tr>
                    <td className='fs-5'>{index + 1}</td>
                    <td className='fs-5'>{item?.userName}</td>
                    <td className='fs-5'>{item?.eventName}</td>
                    <td className='fs-5'>{item?.eventDate}</td>
                    <td className='fs-5'>{item?.eventTime}</td>
                    <td className='fs-5'>{item?.eventPlace}</td>
                    <td className='fs-5'>{item?.ticketNo}</td>
                    <td className='fs-3 text-danger-emphasis'>
                      <MdDeleteForever onClick={() => handleDelete(item?._id)} className='zoom-effect' />
                    </td>
                  </tr>
                ))

                }
              </tbody>
            </Table>
          </div>
          :
          <div className='text-center text-danger-emphasis fs-3'>No Bookings Found!</div>

        }
      </div>
    </div>)
}

export default AllBookings