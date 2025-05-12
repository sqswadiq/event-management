import React, { createContext } from 'react'
import { useState } from 'react'

export const addEventContext=createContext()
export const wishlistCountContext=createContext()
export const cartlengthContext=createContext()
export const allEventCountContext=createContext()
export const allUserCountContext=createContext()
export const allPaymentCountContext=createContext()
export const allBookingCountContext=createContext()
export const privateRouteContext=createContext()

function ContextAPI({children}) {
    const[showEventResponse,setShowEventResponse]=useState("")
    const[wishlistCount,setWishlistCount]=useState("")
    const [cartlength,setCartlength]=useState("")
    console.log(cartlength,"reponse in context");
    
    const [allEventCount,setAllEventCount]=useState("")
    const [allPayment,setAllPayment]=useState("")
    const [allUserCount,setAllUserCount]=useState("")
    const [allBookingCount,setAllBookingCount]=useState("")
    const [loggedinRoute,setLoggedinRoute]=useState(false)

  return (
        
            <privateRouteContext.Provider value={{loggedinRoute,setLoggedinRoute}}>
                <allPaymentCountContext.Provider value={{allPayment,setAllPayment}}>
                    <allBookingCountContext.Provider value={{allBookingCount,setAllBookingCount}}>
                        <allUserCountContext.Provider value={{allUserCount,setAllUserCount}}>
                            <cartlengthContext.Provider value={{cartlength,setCartlength}}>
                                <wishlistCountContext.Provider value={{wishlistCount,setWishlistCount}}>
                                    <allEventCountContext.Provider value={{allEventCount,setAllEventCount}}>
                                        <addEventContext.Provider value={{showEventResponse,setShowEventResponse}} >
                                            {children}
                                        </addEventContext.Provider>
                                    </allEventCountContext.Provider>
                                </wishlistCountContext.Provider>
                            </cartlengthContext.Provider>
                        </allUserCountContext.Provider>
                    </allBookingCountContext.Provider>
                </allPaymentCountContext.Provider>
            </privateRouteContext.Provider>
       
  )
}

export default ContextAPI