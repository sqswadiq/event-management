import React, { useState } from 'react'
import { Link, useNavigate, } from "react-router-dom";
import './Authentication.css'
import { loginAPI, registerAPI } from '../services/allAPI';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner'
import { privateRouteContext } from '../context/ContextAPI';
import { useContext } from 'react';


function Authentication({ insideRegister }) {

    const { setLoggedinRoute } = useContext(privateRouteContext)
    const navigate = useNavigate()
    const [userData, setUserData] = useState({ userName: "", email: "", password: "" })
    console.log(userData);
    const [isLogedIn, setIsLoggedIn] = useState(false)

    const { userName, email, password } = userData

    const handleRegister = async (e) => {
        e.preventDefault()
        if (userName && email && password) {
            const result = await registerAPI(userData)
            console.log(result);
            try {
                if (result.status == 200) {
                    navigate("/login")
                    setUserData({ userName: "", email: "", password: "" })
                    toast.success("Register Successfull ! Login Now")
                }
                else {
                    if (result.status == 406) {
                        toast.error(result.response.data)
                    }
                }
            } catch (error) {
                console.log(error);

            }

        }
        else {
            toast.warning("please complete the form ")
        }

    }
    const handleLogin = async (e) => {
        e.preventDefault()
        if (email && password) {
            console.log(userName, email);

            // api call
            const result = await loginAPI(userData)
            console.log(result);

            try {
                if (result.status == 200) {
                    setLoggedinRoute(true)
                    setIsLoggedIn(true)
                    const user = result.data.user

                    sessionStorage.setItem("user", JSON.stringify(user))
                    sessionStorage.setItem("token", result.data.token)
                    setTimeout(() => {
                        setUserData({ email: "", password: "" })
                        setIsLoggedIn(false)

                        // navigate based on role
                        if (user.role == "admin") {
                            navigate("/admindashboard/dashboard");
                        } else {
                            navigate("/");
                        }
                    }, 2000);
                } else {
                    toast.error("Incorrect Email or Password")
                }

            }
            catch (error) {
                console.log(error);

            }
        } else {
            toast.error("Please completly fill the form")
        }

    }
    return (
        <div className='container-fluid registercontainer p-5 d-flex justify-content-center align-items-center'>
            <div className='shadow w-100  rounded formbox'>
                <div className="p-4 d-flex flex-column justify-content-center">
                    <div className='d-lg-flex justify-content-center text-center'>
                        <div>
                            <h3 className="text-center mb-3 primarycolor fw-bold">{insideRegister ? 'Create' : 'Sign In '}<span className='secondarycolor fw-bold'>Your Account</span></h3>
                        </div>
                        {isLogedIn && <Spinner className='mx-2' animation="border" variant="light" />}
                    </div>

                    <form action="">
                        {insideRegister &&
                            <div class="outer d-flex flex-row align-items-center mb-4 border border-1 bg-light px-2 py-1 rounded shadow">
                                <i class="fas fa-user fa-lg fa-fw "></i>
                                <div class="form-outline flex-fill mb-0">
                                    <input value={userData.userName} onChange={(e) => setUserData({ ...userData, userName: e.target.value })} class="form-control border border-0 shadow-none bg-light" placeholder='Enter Username' />
                                </div>
                            </div>
                        }

                        <div class="outer d-flex flex-row align-items-center mb-4 border border-1 bg-light px-2 py-1 rounded shadow">
                            <i class="fas fa-envelope fa-lg fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                                <input value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} class="form-control border border-0 shadow-none bg-light" placeholder='Enter Email' />
                            </div>
                        </div>

                        <div class="outer d-flex flex-row align-items-center mb-4 border border-1 bg-light px-2 py-1 rounded shadow">
                            <i class="fas fa-lock fa-lg fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                                <input value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} class="form-control border border-0 shadow-none bg-light" placeholder='Enter Password' />
                            </div>
                        </div>

                        <div className='text-center text-secondary'>
                            {insideRegister ?
                                <button className='btn bookingbutton' onClick={handleRegister}>Register</button>
                                :
                                <button className='btn bookingbutton' onClick={handleLogin}>Login</button>

                            }
                            {insideRegister ?
                                <p className='primarycolor'>Already Registered? &nbsp;<Link to={'/login'} className='text-dark'>Login Now!</Link></p>
                                :
                                <p className='primarycolor'>Not Yet Registered? &nbsp;<Link to={'/register'} className='text-dark'>Register Now!</Link></p>
                            }

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Authentication