import React, { useEffect, useState, useRef } from "react";
import "./Counter.css";

function Counter() {
  const [counts, setCounts] = useState({
    participants: 0,
    cities: 0,
    events: 0,
    speakers: 0,
  });

  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCounter();
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounter = () => {
    const targetCounts = { participants: 987, cities: 156, events: 85, speakers: 221 };
    const duration = 2000;
    const interval = 50;

    Object.keys(targetCounts).forEach((key) => {
      let start = 0;
      const increment = targetCounts[key] / (duration / interval);

      const counter = setInterval(() => {
        start += increment;
        if (start >= targetCounts[key]) {
          start = targetCounts[key];
          clearInterval(counter);
        }
        setCounts((prevCounts) => ({ ...prevCounts, [key]: Math.floor(start) }));
      }, interval);
    });
  };

  return (
    <div ref={sectionRef} className="counter_container d-flex align-items-center">
      <div className="content d-flex justify-content-between align-items-center w-100 h-100 flex-column flex-md-row  py-4">
        <div className="box w-25  m-3  py-3 d-flex flex-column justify-content-evenly align-items-center">
          <div className="icon"><i className="fa-solid fa-users secondarycolor"></i></div>
          <div className="num fs-1 thirdcolor">{counts.participants}</div>
          <div className="text fs-3 secondarycolor">Participants</div>
        </div>
        <div className="box w-25 m-3 py-3 d-flex flex-column justify-content-evenly align-items-center">
          <div className="icon"><i className="fa-solid fa-map-location-dot secondarycolor"></i></div>
          <div className="num fs-1 thirdcolor">{counts.cities}</div>
          <div className="text fs-3 secondarycolor">Cities</div>
        </div>
        <div className="box w-25 m-3 py-3 d-flex flex-column justify-content-evenly align-items-center">
          <div className="icon"><i className="fa-solid fa-drum secondarycolor"></i></div>
          <div className="num fs-1 thirdcolor">{counts.events}</div>
          <div className="text fs-3 secondarycolor">Events</div>
        </div>
        <div className="box w-25 m-3  py-3 d-flex flex-column justify-content-evenly align-items-center">
          <div className="icon"><i className="fa-solid fa-microphone-lines secondarycolor"></i></div>
          <div className="num fs-1 thirdcolor">{counts.speakers}</div>
          <div className="text fs-3 secondarycolor">Speakers</div>
        </div>
      </div>
    </div>
  );
}

export default Counter;
