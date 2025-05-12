import React, { useContext, useEffect, useState } from 'react'
import '../../pages/admin/Admin.css'
import Table from 'react-bootstrap/Table';
import { MdDeleteForever } from "react-icons/md";
import { deleteUserAPI, getAllUserAPI } from '../../services/allAPI';
import { toast } from 'react-toastify';
import { allUserCountContext } from '../../context/ContextAPI';


function AllUsers() {
  const [userData, setUserData] = useState([])
  console.log(userData, "userData in AllUser");

  const { setAllUserCount } = useContext(allUserCountContext);

  useEffect(() => {
    getAllUser()
  }, [])

  const getAllUser = async () => {
    const result = await getAllUserAPI()
    if (result.status === 200) {
      setUserData(result.data)
      setAllUserCount(result.data.length)

    }
  }

  const handleDelete = async (userId) => {
    const result = await deleteUserAPI(userId)

    if (result.status == 200) {
      toast.error("User Deleted")
      getAllUser()
    }
  }
  return (
    <div className='w-100'>
      <h2 className='thirdbg rounded-top thirdcoloradmin ps-3 fs-2 py-2'>All Users</h2>


      <div className='overflowscroll'>
        {userData?.length > 0 ?
          <Table className='mt-5 w-100' striped bordered hover>
            <thead>
              <tr>
                <th className='fw-bold'>#</th>
                <th className='fw-bold'>User Name</th>
                <th className='fw-bold'>Email</th>
                <th className='fw-bold'>Phone No</th>
                <th className='fw-bold'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                userData?.map((item, index) => (
                  <tr>
                    <td className='fs-5'>{index + 1}</td>
                    <td className='fs-5'>{item?.userName}</td>
                    <td className='fs-5'>{item?.email}</td>
                    <td className='fs-5'>{item ? item.phoneNo : "No Number"}</td>
                    <td className='fs-3 text-danger-emphasis'>
                      <MdDeleteForever onClick={() => handleDelete(item?._id)} className='zoom-effect' />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>

          :
          <div className='text-center fs-5 text-danger-emphasis'>No Users Found!</div>
        }
      </div>
    </div>
  )
}

export default AllUsers