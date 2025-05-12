import React from 'react'
import img1 from '../../assets/Aboutgrid1.jpg'
import img2 from '../../assets/Aboutgrid2.jpg'
import img3 from '../../assets/Aboutgrid3.jpg'
import img4 from '../../assets/Aboutgrid4.jpg'
import './AboutEvent.css'


function AboutEvent() {
    return (
        <div className='aboutparent'>
            <div className="row p-5">
                <div className="col-lg-6 text-light d-flex flex-column pt-5 mt-5">
                    <h3 className='primarycolor fw-bold'>About Event</h3>
                    <hr/>
                    <h1> Experience the Unforgettable</h1>
                    <p className='fs-4'>"Plan, Book, and Experience Unforgettable Events with EventSphere! Whether you're looking to host a grand celebration, attend an exciting concert, or organize a corporate gathering, we make event management effortless. Discover top venues, connect with professional organizers, and book your favorite events—all in one place. Let’s turn your special moments into lifelong memories!"</p>


                </div>
                <div class="container col-lg-6 mt-5">
                    <div class="row ">
                        <div class="col-md-6">
                            <img src={img1} class="grid-img w-100 h-50 img-fluid" alt="Event 1" />
                       
                            <div class="custom-row mt-3">
                                <img src={img3} class="grid-img w-100 h-100" alt="Event 3" />
                            </div>
                   
                        </div>
                        <div class="col-md-6 d-flex flex-column mt-5 pt-5">
                            <div class="custom-row mb-3">
                                <img src={img2} class="grid-img w-100 h-100" alt="Event 2" />
                            </div>
                            <img src={img4} class="grid-img w-100 h-50" alt="Event 4" />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutEvent