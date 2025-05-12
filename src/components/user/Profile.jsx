import React, { useEffect, useState } from 'react'
import UserHeader from './UserHeader';
import UserFooter from './UserFooter';
import { Link } from 'react-router-dom';
import { getUserAPI, updateUserAPI } from '../../services/allAPI';
import {toast } from 'react-toastify';

function Profile() {
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    phoneNo: ''
  });

  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    userDetails();
  }, []);

  const userDetails = async () => {
    try {
      const result = await getUserAPI(user?._id);
      if (result.status === 200) {
        setUserData({
          userName: result.data.userName,
          email: result.data.email,
          phoneNo: result.data.phoneNo
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdateUser = async () => {
    try {
      const result = await updateUserAPI(user._id, userData);
      if (result.status === 200) {
        toast.success("Profile updated successfully");
        sessionStorage.setItem("user", JSON.stringify(result.data));
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  return (
    <div>
      <UserHeader />
      <div className='p-5 bgimg'>

        <div className='content mt-5 col col-md-6 mx-auto'>
          <form className='container  rounded shadow px-0 bgshade'>
            <h3 className='bg-light py-2 ps-2 w-100 rounded-top text-secondary'>
              Edit Profile <i className="fa-solid fa-pen fs-5 ms-2"></i>
            </h3>
  
            <div className='px-4 pb-4'>
              <div className='my-3'>
                <span className='text-secondary fw-bold ps-2'>Full Name</span>
                <input
                  className='form-control w-75 bg-light'
                  type="text"
                  name="userName"
                  value={userData.userName}
                  onChange={handleChange}
                />
              </div>
              <div className='my-3'>
                <span className='text-secondary fw-bold ps-2'>Email</span>
                <input
                  className='form-control w-75 bg-light'
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              <div className='my-3'>
                <span className='text-secondary fw-bold ps-2'>Number</span>
                <input
                  className='form-control w-75 bg-light'
                  type="text"
                  name="phoneNo"
                  value={userData.phoneNo?userData.phoneNo:""}
                  onChange={handleChange}
                />
              </div>
  
              <div className='ps-3'>
                <Link to={'/changepassword'} className='text-decoration-none text-primary-emphasis'>
                  <span>Change Password <i className="fa-solid fa-key ms-2"></i></span>
                </Link>
  
                <div className='text-md-end text-center pe-5 mt-5'>
                  <div className='pe-4 mt-3'>
                    <Link to={'/'} className='text-decoration-none'>
                      <button className='btn btn-outline-secondary px-4 py-2 me-3 mb-2' type='button'>Cancel</button>
                    </Link>
  
                    <button className='btn bookingbutton px-4 py-2 outline mb-2' type='button' onClick={handleUpdateUser}>
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

      </div>
      <UserFooter />
    </div>
  )
}

export default Profile;
