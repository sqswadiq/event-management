import React, { useContext, useEffect, useState } from 'react';
import UserHeader from '../../components/user/UserHeader';
import UserFooter from '../../components/user/UserFooter';
import { addPaymentDetailsAPI, bookEventAPI, clearCartAPI, createOrderAPI, deleteCartItemAPI, getCartItemAPI, getUserAPI, updateCartCountAPI, validatePaymentAPI } from '../../services/allAPI';
import ServerURL from '../../services/server_url';
import { cartlengthContext } from '../../context/ContextAPI';
import { toast } from 'react-toastify';
import eventlogopayment from '../../assets/eventlogopayment.jpg'


function Usercart() {
  const [userData, setUserData] = useState("");
  const [cartItem, setCartItem] = useState([]);
  const { cartlength, setCartlength } = useContext(cartlengthContext);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    setCartlength(cartItem?.length);
  }, [cartItem]);

  const fetchCartItems = async () => {
    try {
      const result = await getCartItemAPI(userId);
      if (result.status === 200) {
        setCartItem(result.data);
      }
    } catch (error) {
      console.error("Error fetching cart items", error);
    }
  };

  const handleDeleteCartItem = async (id) => {
    try {
      const result = await deleteCartItemAPI(id);
      if (result.status === 200) {
        setCartItem(cartItem.filter(item => item._id !== id));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error("Failed to delete cart item:", error);
    }
  };

  const handleCountChange = async (id, action) => {
    try {
      const result = await updateCartCountAPI(id, action);
      if (result.status === 200) {
        fetchCartItems();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        console.log("Failed to update cart count");
      }
    } catch (error) {
      console.log("Error updating cart count:", error);
    }
  };

  const subtotal = cartItem.map((item) => item.price * item.count).reduce((a, b) => a + b, 0);
  const gst = parseFloat((subtotal * 0.05).toFixed(2));  // 5% GST
  const totalPrice = subtotal + gst;

  useEffect(() => {
    userDetails();
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


  const handlePaymentSuccess = async (response, totalAmount) => {
    console.log(response, "inside paymentsss");

    const paymentDetails = {
      userId: userId,
      paymentId: response.razorpay_payment_id,
      amount: totalAmount,
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


  const handlePayment = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to proceed with payment.");
      return;
    }
    const amountInPaise = Math.round(parseFloat(totalPrice) * 100);
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
        image: eventlogopayment,  // logo URL
        order_id: order.data.id,
        handler: async function (response) {


          const validationResult = await validatePaymentAPI(response);

          if (validationResult?.status === 200) {
            await handlePaymentSuccess(response, totalPrice);

            // Prepare booking data as an array
            const bookings = cartItem.map(item => ({
              userId,
              eventId: item._id,
              eventName: item.eventname,
              eventDate: item.date,
              eventTime: item.time,
              eventPlace: item.place,
              ticketNo: `TKT-${item._id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Generating a unique ticket number
            }));

            // Send all bookings in one API call
            const bookingResponse = await bookEventAPI(bookings);

            if (bookingResponse.status === 201) {
              // Clear the cart after successful booking
              await clearCartAPI(userId);
              setCartItem([]);
              setCartlength(0);
              toast.success("Event Booked successfully & cart cleared!");
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
          address: "Razorpay Corporate Office",
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
      <div className='bgimg'>
        <div className='row p-5 m-0 d-flex justify-content-center content mt-5'>

          <div className="col-lg-7 rounded shadow p-5 me-lg-5 mt-4 bgshade">
            <h3 className='fw-bold primarycolor'>Event Cart</h3>
            {
              cartItem?.length > 0 ?
                cartItem.map((item) => (
                  <div key={item._id}>
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="row mt-3">
                          <div className="col-md-3">
                            <img className='img-fluid rounded' style={{ width: "100px", height: "80px", background: "black" }} src={`${ServerURL}/upload/${item?.eventimage}`} alt="" />
                          </div>
                          <div className="col-md-9">
                            <h4 className='primarycolor'>{item?.eventname}</h4>
                            <p className='primarycolor fs-6 m-0'>Location: <span>{item?.place}</span></p>
                            <p className='primarycolor fs-6 m-0'>Date: <span>{item?.date}</span></p>
                            <button onClick={() => handleDeleteCartItem(item?._id)} className='btn btn-outline-secondary ms-2 mt-2'><i className="fa-solid fa-xmark me-2"></i>Remove</button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 p-5">
                        <div style={{ maxWidth: '150px' }} className='border border-secondary rounded d-flex justify-content-center align-items-center py-1 mb-4 primarycolor'>
                          <i onClick={() => handleCountChange(item._id, "decrement")} className="fa-solid fa-minus mx-2 cart-count-btn"></i>
                          <span className='mx-3 fs-6'>{item?.count}</span>
                          <i onClick={() => handleCountChange(item._id, "increment")} className="fa-solid fa-plus mx-2 cart-count-btn"></i>
                        </div>
                        <h3 className='ms-1 primarycolor fw-bold'>₹{item?.count * item?.price}</h3>
                      </div>
                    </div>
                    <hr className='w-100 primarycolor' style={{ marginTop: "-5%" }} />
                  </div>
                ))
                :
                <div className='text-center text-danger-emphasis'><h5>No Items In Cart! Please Add</h5></div>
            }
          </div>

          <div className="col-lg-4 rounded shadow p-5 mt-4 bgshade" style={{ maxHeight: "410px" }}>
            <h3 className='fw-bold mb-5 primarycolor'>Cart Summary</h3>
            <div className='d-flex justify-content-between w-100 primarycolor' >
              <p className='fs-5 fw-bold'>Items</p>
              <span className='fs-6 '>{cartItem?.length}</span>
            </div>
            <div className='d-flex justify-content-between w-100 primarycolor'>
              <p className='fs-5 fw-bold'>Subtotal</p>
              <span className='fs-6'>₹{subtotal}</span>
            </div>
            <div className='d-flex justify-content-between w-100 primarycolor'>
              <p className='fs-5 fw-bold'>GST(5%)</p>
              <span className='fs-6'>₹{gst}</span>
            </div>
            <div className='d-flex justify-content-between w-100 primarycolor'>
              <h4 className='fw-bold'>Total</h4>
              <h4 className='fw-bold'>₹{totalPrice}</h4>
            </div>
            <button className={cartItem.length === 0 ? 'btn btn-secondary disabled w-100 fs- fw-bold py-2' : 'btn bookingbutton w-100 fs- fw-bold py-2'} onClick={handlePayment}>Book Ticket</button>
          </div>

        </div>
      </div>
      <UserFooter />
    </>
  );
}

export default Usercart;
