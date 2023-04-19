import React, { useState } from 'react';
function Explore() {
      //add finding friends based on name here
  const [searchInput, setSearchInput] = useState("");
  const Change = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  }
  const FindFriends = (e) => {
    e.preventDefault();
  }
  //add finding photos based on tag here
  const FindPhotos = (e) => {
    e.preventDefault();
  }
  //add finding USERS based on comment text
  const FindComments = (e) => {
    e.preventDefault();
  }
    return(
        <div>
          <h5>Search for Friends</h5>
          <input type="search" placeholder='Search user name' onChange={Change} value={searchInput}/>
          <button onClick={FindFriends} class='btn btn-success w-150 rounded-0'>Search</button>
          <h5>Search for Photos</h5>
          <input type="search" placeholder='Search photo tag' onChange={Change} value={searchInput}/>
          <button onClick={FindFriends} class='btn btn-success w-150 rounded-0'>Search</button>
          <h5>Search for Comments</h5>
          <input type="search" placeholder='Search comment' onChange={Change} value={searchInput}/>
          <button onClick={FindComments} class='btn btn-success w-150 rounded-0'>Search</button>
          <h2>You May Also Like</h2>
            <div className="you-may-also-like">
              {/* Display photo recommendations based on tags */}
            </div>
          <h2>Friend Recommendations</h2>
            <div className="you-may-also-like">
              {/* Display friend recommendations */}
            </div>
        </div>
    )
}
export default Explore