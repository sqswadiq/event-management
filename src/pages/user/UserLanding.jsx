import React from 'react'
import Slider from '../../components/user/Slider'
import Landing from '../../components/user/Landing'
import Counter from '../../components/user/Counter'
import AboutEvent from '../../components/user/AboutEvent'
import UserHeader from '../../components/user/UserHeader'
import UserFooter from '../../components/user/UserFooter'

function UserLanding() {
  return (
    <div>
        <UserHeader />
        <Landing/>
        <div style={{height:"10px", backgroundColor:"#FAF9F6"}}></div>
        <AboutEvent/>
        <Counter/>
        <Slider/>
        <UserFooter/>
    </div>
  )
}

export default UserLanding