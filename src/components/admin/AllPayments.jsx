import React, { useContext, useEffect, useState } from 'react'
import '../../pages/admin/Admin.css'
import { deletePaymentAPI, getPaymentDetailsAPI } from '../../services/allAPI'
import Table from 'react-bootstrap/Table';
import { MdDeleteForever } from "react-icons/md";
import { allPaymentCountContext } from '../../context/ContextAPI';


function AllPayments() {

  const [payments, setPayments] = useState([])
  console.log(payments, "state in payments");

  const totalRevenue = payments?.reduce((total, payment) => total + payment.amount, 0);
  console.log(totalRevenue, "total revenue");

  const { setAllPayment } = useContext(allPaymentCountContext)
  setAllPayment(totalRevenue)


  useEffect(() => {
    fetchPayments()
  }, [])


  const fetchPayments = async (req, res) => {
    try {
      const result = await getPaymentDetailsAPI()

      if (result.status == 200) {
        setPayments(result.data)
      }

    } catch (error) {
      console.log(error);

    }
  }

  const handleDelete = async (id) => {

    try {
      const result = await deletePaymentAPI(id)

      if (result.status == 200) {
        fetchPayments()
      }
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <div className='w-100'>
      <h2 className='thirdbg rounded-top thirdcoloradmin ps-3 fs-2 py-2'>All Payments</h2>
      
      <div className='overflowscroll'>
        {
          payments?.length > 0 ?
            <Table striped bordered hover className='mt-5 w-100'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User Name</th>
                  <th>Payment Id</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  payments.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item?.userId.userName}</td>
                      <td>{item?.paymentId}</td>
                      <td>{item?.amount}</td>
                      <td>{item?.paymentMethod}</td>
                      <td className=' fs-3 text-danger-emphasis'>
                        <MdDeleteForever onClick={() => handleDelete(item?._id)} className='zoom-effect' />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>

            :
            <div className='text-center text-danger-emphasis fs-2'>No payments Found!</div>
        }
      </div>


    </div>
  )
}

export default AllPayments