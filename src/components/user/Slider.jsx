import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './slider.css';


import event1 from '../../assets/slider1_1.jpg'
import event2 from '../../assets/slider1_2.jpg';
import event3 from '../../assets/fashion.jpg';
import event4 from '../../assets/aiexpo.jpg';
import event5 from '../../assets/foodexpo.jpg';
import event6 from '../../assets/esports.jpg';

function Slider() {

  
  return (
    <div className='row m-0'>
      <div className='col-lg-6 p-5'>
        <Carousel  interval={3000}>
          {/* First Slide - Trending Event */}
          <Carousel.Item className='carousel-item'>
            <img className="w-100 rounded" src={event1} alt="Tech Conference 2025" style={{maxHeight:"400px"}}/>
            <Carousel.Caption>
              <h5 className="badge bg-danger fs-6">Featured</h5>
              <h3>Tech Conference 2025</h3>
              <p>Explore the latest trends in technology and innovation.</p>
            </Carousel.Caption>
          </Carousel.Item>
  
          {/* Second Slide - Featured Event */}
          <Carousel.Item className='carousel-item'>
            <img className="w-100 rounded" src={event2} alt="Music Festival" style={{maxHeight:"400px"}}/>
            <Carousel.Caption>
              <h5 className="badge bg-danger fs-6">Featured</h5>
              <h3 className=''>Music Festival</h3>
              <p>Experience live performances from top artists around the world.</p>
            </Carousel.Caption>
          </Carousel.Item>
  
          {/* Third Slide - Trending Event */}
          <Carousel.Item className='carousel-item'>
            <img className="w-100 rounded" src={event3} alt="Startup Summit" style={{maxHeight:"400px"}}/>
            <Carousel.Caption>
              <h5 className="badge bg-danger fs-6">Featured</h5>
              <h3>Fashion Week 2025</h3>
              <p>Witness the latest fashion trends from top designers worldwide.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className='col-lg-6 p-5'>
        <Carousel  interval={3000}>
          {/* First Slide - Trending Event */}
          <Carousel.Item className='carousel-item'>
            <img className="w-100 rounded" src={event4} alt="Tech Conference 2025" style={{maxHeight:"400px"}}/>
            <Carousel.Caption>
              <h5 className="badge bg-warning fs-6">Trending</h5>
              <h3>AI Expo 2025</h3>
              <p>Discover the future of AI and machine learning innovations.</p>
            </Carousel.Caption>
          </Carousel.Item>
  
          {/* Second Slide - Featured Event */}
          <Carousel.Item className='carousel-item'>
            <img className="w-100 rounded" src={event5} alt="Music Festival" style={{maxHeight:"400px"}}/>
            <Carousel.Caption>
              <h5 className="badge bg-warning fs-6">Trending</h5>
              <h3>Food Carnival 2025</h3>
              <p>A paradise for food lovers with exotic cuisines and live cooking shows.</p>
            </Carousel.Caption>
          </Carousel.Item>
  
          {/* Third Slide - Trending Event */}
          <Carousel.Item className='carousel-item'>
            <img className="w-100 rounded" src={event6} alt="Startup Summit" style={{maxHeight:"400px"}}/>
            <Carousel.Caption>
              <h5 className="badge bg-warning fs-6">Trending</h5>
              <h3>E-Sports Championship</h3>
              <p>Experience the thrill of top-tier gaming competitions.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
  
    </div>
  );
}

export default Slider;
