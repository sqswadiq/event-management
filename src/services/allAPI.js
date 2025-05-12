
import commonAPI from "./commonAPI";
import ServerURL from "./server_url";

// register

export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${ServerURL}/register`, reqBody)
}
// login

export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${ServerURL}/login`, reqBody)
}
// get user

export const getUserAPI = async (userId) => {
    return await commonAPI("GET", `${ServerURL}/userDetails/${userId}`)
}

// update user
export const updateUserAPI = async (userId, reqBody) => {
    return await commonAPI("PUT", `${ServerURL}/updateUser/${userId}`, reqBody);
}

// get All user

export const getAllUserAPI = async () => {
    return await commonAPI("GET", `${ServerURL}/allUserDetails`, "")
}
// delete user
export const deleteUserAPI = async (userId) => {
    return await commonAPI("DELETE", `${ServerURL}/deleteUser/${userId}`)
}
// change password
export const changePasswordAPI = async (reqBody) => {
    return await commonAPI("PUT", `${ServerURL}/changepassword`, reqBody)
}

// add event
export const addEventAPI = async (reqBody, reqheader) => {
    return await commonAPI("POST", `${ServerURL}/addevents`, reqBody, reqheader)
}
// get events
export const getEventAPI = async () => {
    return await commonAPI("GET", `${ServerURL}/getevents`, "")
}
// delete events
export const deleteEventAPI = async (id) => {
    return await commonAPI("DELETE", `${ServerURL}/deleteevents/${id}`, {})
}
// Edit event by ID
export const editEventAPI = async (id, updatedData) => {
    return await commonAPI("PUT", `${ServerURL}/editevent/${id}`, updatedData);
};

// add to wishlist
export const addToWishlistAPI = async (reqBody) => {
    return await commonAPI("POST", `${ServerURL}/addwishlist`, reqBody);
};
// get  wishlist item
export const getWishlistAPI = async (userId) => {
    return await commonAPI("GET", `${ServerURL}/getwishlist/${userId}`);
};
// delete  wishlist item
export const deleteWishlistAPI = async (wishlistId) => {
    return await commonAPI("DELETE", `${ServerURL}/deleteWishlist/${wishlistId}`);
};

// add to cart 
export const addtoCartAPI = async (reqBody) => {
    return await commonAPI("POST", `${ServerURL}/addcart`, reqBody)
}
// get  cart item
export const getCartItemAPI = async (userId) => {
    return await commonAPI("GET", `${ServerURL}/getcart/${userId}`)
}
// delete  cart item
export const deleteCartItemAPI = async (id) => {
    return await commonAPI("DELETE", `${ServerURL}/removecart/${id}`)
}
// Update cart count
export const updateCartCountAPI = async (id, action) => {
    return await commonAPI("PUT", `${ServerURL}/updatecartcount/${id}`, { action });
};


// Create Razorpay order
export const createOrderAPI = async (amount, currency, receiptId) => {
    return await commonAPI("POST", `${ServerURL}/order`, { amount, currency, receipt: receiptId });
};

// Validate Razorpay payment
export const validatePaymentAPI = async (paymentResponse) => {
    return await commonAPI("POST", `${ServerURL}/order/validate`, paymentResponse);
};
// clear cart after checkout
export const clearCartAPI = async (userId) => {
    return await commonAPI("DELETE", `${ServerURL}/clearcart/${userId}`);
};

// booking event
export const bookEventAPI = async (bookingData) => {
    return await commonAPI("POST", `${ServerURL}/book-event`, bookingData);
};

// get user Booking
export const userBookingAPI=async(userId)=>{
    return await commonAPI("GET",`${ServerURL}/userbookings/${userId}`)
}
// get All Booking
export const allBookingAPI=async()=>{
    return await commonAPI("GET",`${ServerURL}/allbookings`)
}
// delete  Bookings
export const deleteBookingAPI=async(id)=>{
    return await commonAPI("DELETE",`${ServerURL}/deletbooking/${id}`)
}
// Add Payment Details
export const addPaymentDetailsAPI=async(reqBody)=>{
    return await commonAPI("POST",`${ServerURL}/addpayment`,reqBody)
}
// get Payment Details
export const getPaymentDetailsAPI=async()=>{
    return await commonAPI("GET",`${ServerURL}/getpayments`)
}
// delete Payment Details
export const deletePaymentAPI=async(id)=>{
    return await commonAPI("DELETE",`${ServerURL}/deletepayments/${id}`)
}
