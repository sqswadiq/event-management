import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import UserHeader from '../../components/user/UserHeader';
import UserFooter from '../../components/user/UserFooter';
import { useEffect } from 'react';
import { addPaymentDetailsAPI, addtoCartAPI, addToWishlistAPI, bookEventAPI, createOrderAPI, getEventAPI, getUserAPI, validatePaymentAPI } from '../../services/allAPI';
import ServerURL from '../../services/server_url';
import { toast } from 'react-toastify';
import { cartlengthContext } from '../../context/ContextAPI';


function UserEvents() {


    const [allEvents, setAllEvents] = useState([])
    const [location, setLocation] = useState("")
    console.log(location);
    const { cartlength, setCartlength } = useContext(cartlengthContext)
    const [userData, setUserData] = useState("");


    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId=user?._id

    useEffect(() => {
        userDetails();
        getAllEvents()
    }, []);

    const userDetails = async () => {
        try {
            const result = await getUserAPI(user?._id);
            if (result.status === 200) {
                setUserData(result.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getAllEvents = async () => {
        try {
            const result = await getEventAPI()
            console.log("API Response user Events:", result);

            if (result.data) {
                setAllEvents(result.data);
            } else {
                console.error("Unexpected API response:", result);
            }
        } catch (error) {
            console.log(error);

        }
    }





    const handlecart = async (eventData) => {
        const userId = JSON.parse(sessionStorage.getItem("user"))?._id;

        if (!userId) {
            toast.warning("Please login first.");
            return;
        }
        const cartItem = {
            userId,
            eventId: eventData?._id,
            eventname: eventData?.eventname,
            price: eventData?.price,
            date: eventData?.date,
            time: eventData?.time,
            place: eventData?.place,
            eventimage: eventData?.eventimage
        }
        try {
            const result = await addtoCartAPI(cartItem)
            console.log(result);
            if (result.status == 200) {
                toast.success("Added To Cart")
                setCartlength(result.data.length)
            }
            else if (result.status == 201) {
                toast.warning("Count Incremented")
            }


        } catch (error) {
            console.log("Error adding to cart:", error);

        }
    }
    const handlewishlist = async (eventId) => {
        const userId = JSON.parse(sessionStorage.getItem("user"))?._id;

        if (!userId) {
            toast.warning("Please login first.");
            return;
        }

        const reqBody = { userId, eventId }

        try {
            const result = await addToWishlistAPI(reqBody)
            if (result.status == 200) {

                toast.success("Event added to wishlist!");
            }
            else {
                toast.error("Event already in wishlist.");
            }
        }
        catch (error) {
            console.log("Error adding to wishlist", error);

        }
    }

    const searchFilter = allEvents.filter((item) =>
        item.place.toLowerCase().includes(location.toLowerCase()) ||
        item.eventname.toLowerCase().includes(location.toLowerCase())
    )
    console.log(searchFilter, "filtered by search");


     const handlePaymentSuccess = async (response, amount) => {
        const paymentDetails = {
          userId: userId,
          paymentId: response.razorpay_payment_id,
          amount: amount/100,
          paymentMethod: "Razorpay"
        };
    
        console.log(paymentDetails);
        
        try {
          const result = await addPaymentDetailsAPI(paymentDetails);
          console.log("Payment saved:", result);
        } catch (err) {
          console.error("Error saving payment:", err);
        }
      };


    const handlePayment = async (e, item) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please login to proceed with payment.");
            return;
        }
        const amountInPaise = Math.round(parseFloat(item?.price) * 100);
        const amount = amountInPaise
        const currency = "INR";
        const receiptId = "receipt_" + new Date().getTime();  // generate a dynamic receipt

        try {
            const order = await createOrderAPI(amount, currency, receiptId);

            if (order.status !== 200 || !order.data?.id) {
                toast.error("Failed to create Razorpay order.");
                return;
            }

            const razorpayKey = "rzp_test_zVjGKVDNChF3KT"; // Make sure this is a valid Razorpay key

            const options = {
                key: razorpayKey,
                amount,
                currency,
                name: "EventSphere",
                description: "Test Transaction",
                image: "https://example.com/your_logo",  // Replace with your logo URL
                order_id: order.data.id,
                handler: async function (response) {
                    const validationResult = await validatePaymentAPI(response);

                    if (validationResult?.status === 200) {
                        await handlePaymentSuccess(response, amount);
                        // Prepare booking data as an array
                        const bookings = {
                            userId,
                            eventId: item?._id,
                            eventName: item?.eventname,
                            eventDate: item?.date,
                            eventTime: item?.time,
                            eventPlace: item?.place,
                        };

                        // Send all bookings in one API call
                        const bookingResponse = await bookEventAPI(bookings);
                        console.log(bookingResponse,"inside userevent");
                        

                        if (bookingResponse.status === 201) {
                            toast.success(`Event Booked successfully`);
                        } else {
                            toast.error("Booking failed.");
                        }
                    } else {
                        toast.error("Payment validation failed.");
                    }
                },
                prefill: {
                    name: userData?.userName,
                    email: userData?.email,
                    contact: userData?.phoneNo,
                },
                notes: {
                    address: "Event Sphere calicut pvt ltd",
                },
                theme: {
                    color: "#4c0a68",
                },
            };

            var rzp1 = new window.Razorpay(options);
            rzp1.on("payment.failed", function (response) {
                toast.warning(response.error.description);
            });
            rzp1.open();
        } catch (error) {
            console.error("Error in Razorpay payment", error);
            toast.error("Failed to initiate payment.");
        }
    };

    return (
        <>
            <UserHeader />

            <div className='pt-5 bgimg'>
                <div className='content pt-5'>
                    <div className="d-flex justify-content-center py-2" >
                        <input
                            type="text"
                            className="form-control w-50 py-2"
                            placeholder="Search By Location,Event Name (e.g., calicut)"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
    
                    <div className='container py-5'>
                        <h2 className='text-center fw-bold primarycolor'>Our Events</h2>
                        <div className='eventcards d-flex flex-wrap justify-content-center'>
                            {
                                allEvents.length > 0 ?
                                    searchFilter?.map((item) => (
                                        <Card className="m-3 rounded shadow glass-effect" style={{ width: "18rem" }}>
                                            <Card.Img variant="top" className='img-fluid' src={`${ServerURL}/upload/${item?.eventimage}`} style={{ height: "15rem", backgroundColor: "black" }} />
                                            <Card.Body>
                                                <Card.Title className='fw-bold text-light'>{item?.eventname}</Card.Title>
                                                <Card.Text className=''>
                                                    <p className='text-light'>
                                                        <i className="fa-solid fa-location-dot me-2"></i>
                                                        <span>{item?.place}</span>
                                                    </p>
                                                    <p className='text-light'>
                                                        <i className="fa-solid fa-calendar-days me-2"></i>
                                                        <span>{item?.date}</span>
                                                    </p>
                                                    <p className='text-light'>
                                                        <i className="fa-solid fa-clock me-2"></i>
                                                        <span>{item?.time}</span>
                                                    </p>
                                                    <p className='fs-5 thirdcolor'>
                                                        <span className="me-2 fw-bold">₹</span>
                                                        <span className='fw-bold'>{item?.price}</span>
                                                    </p>
                                                </Card.Text>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <i onClick={() => handlecart(item)} className="secondarycolor fs-4 fa-solid fa-cart-plus me-3 zoom-effect"></i>
                                                        <i onClick={() => handlewishlist(item?._id)} className="thirdcolor fs-4 fa-solid fa-heart-circle-plus me-3 zoom-effect"></i>
                                                    </div>
                                                    <Button onClick={(e) => handlePayment(e, item)} className="bookingbutton">Buy Ticket</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    ))
                                    :
                                    <div className='text-center fs-1 text-danger-emphasis'><p>No Events To Display !</p></div>
    
                            }
                        </div>
                    </div>
                </div>
            </div>

            <UserFooter />
        </>
    )
}

export default UserEvents