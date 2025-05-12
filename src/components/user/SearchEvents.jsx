// import React from "react";






// export default SearchEvents;
import React from 'react'

function SearchEvents() {
  return (
    <div className="d-flex justify-content-center py-2 mt-5 " style={{backgroundColor:"#ccc8bc"}}>
      <input
        type="text"
        className="form-control w-50 py-2"
        placeholder="Enter location (e.g., calicut)"
        // value={location}
        // onChange={(e) => setLocation(e.target.value)}
      />
    </div>
  );
}

export default SearchEvents
