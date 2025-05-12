import React, { useState } from 'react'
import UserHeader from './UserHeader'
import UserFooter from './UserFooter'
import { Link } from 'react-router-dom'
import { changePasswordAPI } from '../../services/allAPI'
import { toast } from 'react-toastify'


function ChangePass() {
    const [userPass, setUserPass] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })
    console.log(userPass);


    const handleChange = (e) => {
        const { name, value } = e.target
        setUserPass({ ...userPass, [name]: value });
    }

    const handleSave = async () => {
        const user = JSON.parse(sessionStorage.getItem("user"))
        const { oldPassword, newPassword, confirmPassword } = userPass

        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.warning("Please fill in all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirmation do not match")
            return
        }

        if (!user?._id) {
            toast.error("User not found. Please log in again.")
            return
        }

        const reqBody = {
            userId: user?._id,
            oldPassword,
            newPassword,
            confirmNewPassword: confirmPassword
        };

        try {
            const result = await changePasswordAPI(reqBody)
            if (result.status == 200) {
                toast.success("Password changed successfully");
                setUserPass({ oldPassword: "", newPassword: "", confirmPassword: "" });
            }
            else if(result.status==401) {
                toast.error("Old Password Is incorrect");
            }
            else{
                toast.error(result.data)
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div>
            <UserHeader />
            <div className='p-5 bgimg'>

                <div className='content mt-5 col col-md-6 mx-auto'>
                    <form className='container rounded shadow px-0 bgshade'>
                        <h4 className='bg-light py-2 ps-2 w-100 rounded-top text-secondary'>
                            Change Password <i class="fa-solid fa-key ms-2"></i>
                        </h4>
    
                        <div className='px-4 pb-4'>
                            <div className='my-3'>
                                <span className='text-secondary fw-bold ps-2'>Old Password</span>
                                <input
                                    className='form-control w-75 bg-light'
                                    type="text"
                                    name="oldPassword"
                                    value={userPass.oldPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='my-3'>
                                <span className='text-secondary fw-bold ps-2'>New Password</span>
                                <input
                                    className='form-control w-75 bg-light'
                                    type="password"
                                    name="newPassword"
                                    value={userPass.newPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='my-3'>
                                <span className='text-secondary fw-bold ps-2'>Confirm Password</span>
                                <input
                                    className='form-control w-75 bg-light'
                                    type="text"
                                    name="confirmPassword"
                                    value={userPass.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
    
                            <div className='ps-3'>
                                <div className='text-md-end text-center pe-5 mt-5'>
                                    <div className='pe-4 mt-3 '>
                                        <Link to={'/profile'} className='text-decoration-none'>
                                            <button className='btn btn-outline-secondary px-4 py-2 me-3 mb-2 ' type='button'>Cancel</button>
                                        </Link>
    
                                        <button className='btn bookingbutton px-4 py-2 outline mb-2' type='button' onClick={handleSave}>
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

export default ChangePass