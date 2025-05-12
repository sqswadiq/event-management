import React from "react";
import eventlogo from '../../assets/eventlogo.png'


function UserFooter() {
  return (
    <footer
      className="text-center text-lg-start primarycolor"
      style={{ backgroundColor: "#0a001a" }}
    >
      <div className="container p-4 pb-0">
        <section>
          <div className="row">
            {/* About EventSphere */}
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="fs-5 mb-4 font-weight-bold">
                EventSphere<img  style={{width:"30px"}} src={eventlogo}/>
              </h6>
              <p>
                Your one-stop platform for discovering, booking, and managing
                events. Explore exciting events near you and secure your spot
                hassle-free!
              </p>
            </div>

            <hr className="w-100 clearfix d-md-none" />

            {/* Event Categories */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="fs-5 mb-4 font-weight-bold">
                Event Categories
              </h6>
              <p><a href="#" className="primarycolor">Concerts & Music</a></p>
              <p><a href="#" className="primarycolor">Business Conferences</a></p>
              <p><a href="#" className="primarycolor">Workshops & Seminars</a></p>
              <p><a href="#" className="primarycolor">Sports & Fitness</a></p>
            </div>

            <hr className="w-100 clearfix d-md-none" />

            {/* Useful Links */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="fs-5 mb-4 font-weight-bold">
                Useful Links
              </h6>
              <p><a href="#" className="primarycolor">My Bookings</a></p>
              <p><a href="#" className="primarycolor">Become an Organizer</a></p>
              <p><a href="#" className="primarycolor">FAQs</a></p>
              <p><a href="#" className="primarycolor">Help & Support</a></p>
            </div>

            <hr className="w-100 clearfix d-md-none" />

            {/* Contact Section */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="fs-5 mb-4 font-weight-bold">Contact</h6>
              <p><i className="fas fa-map-marker-alt mr-3"></i> 123 Event St, New York, NY</p>
              <p><i className="fas fa-envelope mr-3"></i> support@eventsphere.com</p>
              <p><i className="fas fa-phone mr-3"></i> +1 (800) 123-4567</p>
              <p><i className="fas fa-headset mr-3"></i> 24/7 Customer Support</p>
            </div>
          </div>
        </section>

        <hr className="my-3 w-100" />

        {/* Copyright & Social Media */}
        <section className="p-3 pt-0">
          <div className="row d-flex align-items-center">
            {/* Copyright */}
            <div className="col-md-7 col-lg-8 text-center text-md-start">
              <div className="p-3">
                © 2025 EventSphere. All Rights Reserved.
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="col-md-5 col-lg-4 text-center text-md-end">
              <a href="#" className="btn btn-outline-light btn-floating m-1"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="btn btn-outline-light btn-floating m-1"><i className="fab fa-twitter"></i></a>
              <a href="#" className="btn btn-outline-light btn-floating m-1"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="btn btn-outline-light btn-floating m-1"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}

export default UserFooter;
