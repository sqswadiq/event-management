import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import UserHeader from '../../components/user/UserHeader';
import UserFooter from '../../components/user/UserFooter';
import { addtoCartAPI, deleteWishlistAPI, getWishlistAPI } from '../../services/allAPI';
import ServerURL from '../../services/server_url';
import { toast } from 'react-toastify';
import { wishlistCountContext } from '../../context/ContextAPI';
import { useNavigate } from 'react-router-dom';


function Userwishlist() {
    const [wishlist, setWishlist] = useState([]);
    console.log(wishlist);
    const {setWishlistCount}=useContext(wishlistCountContext)
    
    const userId = JSON.parse(sessionStorage.getItem("user"))?._id;
    console.log(userId);
    
    const navigate=useNavigate()

    const handleNavigate=()=>{
        navigate('/usercart')
    }

    useEffect(() => {

        fetchWishlist();

    }, [userId]);

    const fetchWishlist = async () => {
        try {
            const result = await getWishlistAPI(userId);
            console.log("Wishlist data:", result);

            if (result.status === 200) {
                setWishlist(result.data);
                setWishlistCount(result.data.length)
            } else {
                console.error("Failed to fetch wishlist:", result);
            }
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }


    }

    const handleDelete=async(id)=>{

        try {
            const result=await deleteWishlistAPI(id)
            if (result.status==200) {
                toast.error("Event Deleted Successfully")
                fetchWishlist()

            }
        } catch (error) {
            console.log("cannot delete wishlistitem",error);
            
        }
    }

    const handlecart = async(eventData) => {
            const userId = JSON.parse(sessionStorage.getItem("user"))?._id;
    
            if (!userId) {
                toast.warning("Please login first.");
                return;
            }
            const cartItem={
                userId,
                eventId:eventData?._id,
                eventname:eventData?.eventname,
                price:eventData?.price,
                date:eventData?.date,
                time:eventData?.time,
                place:eventData?.place,
                eventimage:eventData?.eventimage
            }
            try {
                const result = await addtoCartAPI(cartItem)
                console.log(result);
                if (result.status==200) {
                    toast.success("Added To Cart")
                }
                else if(result.status==201){
                    toast.warning("Count Incremented")
                }
                
                
            } catch (error) {
                console.log("Error adding to cart:",error);
                
            }
        }

    return (
        <>
            <UserHeader />
            <div className='p-5 m-0 d-flex justify-content-center align-items-center bgimg'>

                {/* wishlist container */}
                <div className='shadow rounded  py-4 px-0 mx-5 content mt-5 bgshade'>
                    <div className='d-flex justify-content-between align-items-start flex-column flex-md-row mx-5'>
                        <h2 className='fw-bold me-4 primarycolor'>My Wishlist <br /> <span className='text-secondary-emphasis fs-4'>({wishlist?.length} items)</span></h2>
                        <div className='text-end'>
                            <button className='btn bookingbutton zoom-effect d-flex align-items-center' onClick={handleNavigate}>
                                <i className="primarycolor fs-4 fa-solid fa-cart-plus me-1"></i>
                                Go to Cart
                            </button>
                        </div>
                    </div>

                    <div className='eventcards d-flex justify-content-center flex-wrap'>


                        {wishlist.length > 0 ?
                            wishlist.map((item) => (
                                <Card className="m-3 rounded shadow" style={{ width: "18rem"}}>
                                    <Card.Img   variant="top" src={`${ServerURL}/upload/${item?.eventId?.eventimage}`} style={{height:"15rem",backgroundColor:"black"}}/>
                                    <Card.Body>
                                        <Card.Title className='fs-3 secondarycolor '>{item?.eventId?.eventname}</Card.Title>
                                        <Card.Text>
                                            <p>
                                                <i className="fa-solid fa-location-dot me-2 secondarycolor"></i>
                                                <span>{item?.eventId?.place}</span>
                                            </p>
                                            <p>
                                                <i className="fa-solid fa-calendar-days me-2 secondarycolor"></i>
                                                <span>{item?.eventId?.date}</span>
                                            </p>
                                            <p>
                                                <i className="fa-solid fa-clock me-2 secondarycolor"></i>
                                                <span>{item?.eventId?.time}</span>
                                            </p>
                                            <p className='fs-5 thirdcolor'>
                                                <span className="me-2 fw-bold">₹</span>
                                                <span className='fw-bold'>{item?.eventId?.price}</span>
                                            </p>
                                        </Card.Text>
                                        <div className="d-flex justify-content-between align-items-center px-3">
                                            <i onClick={()=>handlecart(item?.eventId)} className="secondarycolor fs-4 fa-solid fa-cart-plus zoom-effect"></i>
                                            <i onClick={()=>handleDelete(item._id)} className="thirdcolor fs-4 fa-solid fa-trash zoom-effect"></i>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))
                            :
                            <div>
                                No Item In Wishlist
                            </div>
                        }

                    </div>

                </div>

            </div>
            <UserFooter />
        </>
    )
}

export default Userwishlist