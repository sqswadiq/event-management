import React, { useContext, useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './UserHeader.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { cartlengthContext, wishlistCountContext } from '../../context/ContextAPI';
import { getUserAPI } from '../../services/allAPI';
import { CgMenuRight } from "react-icons/cg";
import eventlogo from '../../assets/eventlogo.png'


function UserHeader() {
    const [userData, setUserData] = useState("")
    console.log(userData, "userData in Header");

    const [isScrolled, setIsScrolled] = useState(false)

    const { wishlistCount } = useContext(wishlistCountContext)
    const { cartlength } = useContext(cartlengthContext)

    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user)

    const navigate = useNavigate();

    const handlecart = () => {
        navigate('/usercart');
    };
    const handlewishlist = () => {
        navigate('/wishlist');
    };

    useEffect(() => {
        userDetails()
    }, [])


    const userDetails = async () => {

        try {
            const result = await getUserAPI(user?._id)
            if (result.status == 200) {
                setUserData(result.data)
            }
        } catch (error) {
            console.log(error);

        }
    }

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    }


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div style={{ background: "transparent" }} className=''>
            <nav className={`navbar navbar-expand-lg headernav w-10 ${isScrolled ? 'scrolled' : 'transparent'}`}>

                <div className="container">
                    {/* Left Side - Logo */}
                    <Link className="navbar-brand primarycolor text-hover fs-3" to="/">
                        EventSphere<img  style={{width:"35px"}} src={eventlogo}/>
                    </Link>

                    {/* Navbar Toggler Button (For Mobile) */}
                    <button
                        className="navbar-toggler shadow-none ms-2 border border-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navigation"
                        aria-controls="navigation"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="mt-2">
                            <CgMenuRight className='text-light fs-1'/>
                        </span>
                    </button>

                    {/* Navbar Content */}
                    <div className="collapse navbar-collapse" id="navigation">
                        {/* Navigation Links */}
                        <ul className="navbar-nav mx-auto fs-5">
                            <li className="nav-item mx-2">
                                <Link className="nav-link primarycolor text-hover" to="/">Home</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link primarycolor text-hover" to="/userevents">Events</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link primarycolor text-hover" to="/userBooking">Bookings</Link>
                            </li>
                        </ul>

                        {/* Icons */}
                        <div className="icons d-flex align-items-center">
                            <i onClick={handlecart} className="primarycolor fs-4 fa-solid fa-cart-plus me-3 zoom-effect" style={{ position: "relative" }}>
                                {cartlength > 0 &&
                                    <Badge bg='secondary' className='text-light  text-center' style={{ position: "absolute", right: "-44%", top: "38%", borderRadius: "50%", fontSize: "10px" }}>{cartlength}</Badge>
                                }
                            </i>
                            <i onClick={handlewishlist} className="primarycolor fs-4 fa-solid fa-heart me-3 zoom-effect" style={{ position: "relative" }}>
                                {wishlistCount > 0 &&
                                    <Badge bg='secondary' className='text-light  text-center' style={{ position: "absolute", right: "-44%", top: "38%", borderRadius: "50%", fontSize: "10px" }}>
                                        {wishlistCount}
                                    </Badge>
                                }
                            </i>

                            <Dropdown>
                                <Dropdown.Toggle className='border border-0 zoom-effect text-light' variant="" id="dropdown-basic">
                                    <i className="fs-4 fa-solid fa-user primarycolor" />
                                    <span className='mx-1 fw-bold primarycolor'>Hi,{userData ? userData.userName : "User"}</span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item className='py-2 fs-5'>
                                        {/* Profile Offcanvas Toggle Button */}
                                        <button
                                            className="border-0 bg-transparent text-secondary"
                                            data-bs-toggle="offcanvas"
                                            data-bs-target="#userOffcanvas"
                                            aria-controls="userOffcanvas"
                                        >
                                            View Profile
                                        </button>
                                    </Dropdown.Item>
                                    <Dropdown.Item className='py-2 fs-5'>
                                        <NavLink className='text-secondary text-decoration-none' to={'/profile'}>Edit Profile</NavLink>
                                    </Dropdown.Item>
                                    <hr className='w-100' />
                                    <Dropdown.Item className='py-2 text-danger fs-5' onClick={handleLogout}>
                                        <i class="fa-solid fa-arrow-right-from-bracket me-2 fs-5"></i>
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </div>
                    </div>
                </div>
            </nav>

            {/* Offcanvas Profile Component (Only Shows When User Icon is Clicked) */}
            <div className="offcanvas offcanvas-end" tabindex="-1" id="userOffcanvas" aria-labelledby="userOffcanvasLabel">
                <div className="offcanvas-header" style={{ backgroundColor: "#d3bff3", color: "#0d021f" }}>
                    <h5 className="offcanvas-title fw-bold" id="userOffcanvasLabel"><i class="fa-regular fa-user me-2"></i>Profile Informations</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                {userData ?
                    <div className="offcanvas-body" style={{ backgroundColor: "#d3bff3" }}>
                        <div className="details">
                            <div>
                                <span className='text-secondary fw-bold'>Full Name</span>
                                <p className='fs-5'>{userData?.userName}</p>
                            </div>
                            <div>
                                <span className='text-secondary fw-bold'>Email</span>
                                <p className='fs-5'>{userData?.email}</p>
                            </div>
                            <div>
                                <span className='text-secondary fw-bold'>Phone No</span>
                                <p className='fs-5'>{userData?.phoneNo ? userData.phoneNo : <span className='text-black-50'>Please Update Number</span>}</p>
                            </div>
                        </div>

                        <div className='mt-5 pt-5 d-flex justify-content-between'>
                            <Link className='text-decoration-none' to={'/profile'}>
                                <button className='btn btn-outline-secondary'>
                                    Edit Profile
                                    <i class="fa-solid fa-user-pen ms-2"></i>
                                </button>
                            </Link>
                            <button className='btn btn-outline-danger' onClick={handleLogout}><i class="fa-solid fa-arrow-right-from-bracket me-2"></i>Logout</button>
                        </div>
                    </div>
                    :
                    <div className="offcanvas-body" style={{ backgroundColor: "#d3bff3" }}>
                        <p className='text-secondary'>Please Login To See User Details!</p>

                        <Link className='text-decoration-none text-dark-emphasis' to={'/login'}>
                            <button className='btn btn-outline-secondary'>
                                Login Now
                            </button>
                        </Link>
                    </div>
                }
            </div>
        </div>
    );
}

export default UserHeader;
