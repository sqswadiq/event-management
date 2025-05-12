import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import UserLanding from './pages/user/UserLanding';
import UserEvents from './pages/user/UserEvents';
import Authentication from './pages/Authentication';
import Usercart from './pages/user/Usercart';
import Userwishlist from './pages/user/Userwishlist';
import AdminDashboard from './pages/admin/AdminDashboard';
import AllUsers from './components/admin/AllUsers';
import Dashboard from './components/admin/Dashboard';
import AllEvents from './components/admin/AllEvents';
import AllBookings from './components/admin/AllBookings';
import AllPayments from './components/admin/AllPayments';
import Profile from './components/user/Profile';
import Booking from './components/user/Booking';
import { ToastContainer } from 'react-toastify';
import ChangePass from './components/user/ChangePass';
import { privateRouteContext } from './context/ContextAPI';
import { useContext } from 'react';


function App() {
  const {loggedinRoute}=useContext(privateRouteContext)
  return (
    <>
      <ToastContainer position="top-right"/>
      {/* Routes for different pages */}
      <Routes>
        <Route path='/register'  element={<Authentication insideRegister={true}/>}/>
        <Route path='/login' element={<Authentication/>}/>

        {/* user */}
        <Route path='/' element={<UserLanding />} />

        <Route path='/userevents' element={ loggedinRoute?<UserEvents />:<Navigate to={'/login'}/>} />
        <Route path='/usercart' element={ loggedinRoute?<Usercart/>:<Navigate to={'/login'}/>}/>
        <Route path='/wishlist' element={ loggedinRoute?<Userwishlist/>:<Navigate to={'/login'}/>}/>
        <Route path='/profile' element={ loggedinRoute?<Profile/>:<Navigate to={'/login'}/>}/>
        <Route path='/changepassword' element={ loggedinRoute?<ChangePass/>:<Navigate to={'/login'}/>}/>
        <Route path='/userBooking' element={ loggedinRoute?<Booking/>:<Navigate to={'/login'}/>}/>

        {/* admin */}
        <Route path='/admindashboard' element={ loggedinRoute?<AdminDashboard/>:<Navigate to={'/login'}/>}>
        <Route path='dashboard' element={ loggedinRoute?<Dashboard/>:<Navigate to={'/login'}/>}/>
        <Route path='allusers' element={ loggedinRoute?<AllUsers/>:<Navigate to={'/login'}/>}/>
        <Route path='allevents' element={ loggedinRoute?<AllEvents/>:<Navigate to={'/login'}/>}/>
        <Route path='allbookings' element={ loggedinRoute?<AllBookings/>:<Navigate to={'/login'}/>}/>
        <Route path='allpayments' element={ loggedinRoute?<AllPayments/>:<Navigate to={'/login'}/>}/>
        </Route>
      </Routes>


    </>
  );
}

export default App;
