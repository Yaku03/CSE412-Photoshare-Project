import React, { useState } from 'react'

function Profile() {

    const [period, setPeriod] = useState(0);
    const [searchInput, setSearchInput] = useState("");
    const Change = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }
    //add photo uploading here
    const addPhoto = (e) => {
      e.preventDefault();
    }
    //add photo deleting here
    const deletePhoto = (e) => {
        e.preventDefault();
    }
    //add album uploading here
    const addAlbum = (e) => {
        e.preventDefault();
    }
    //add album deleting here
    const deleteAlbum = (e) => {
        e.preventDefault();
    }
    const FindPhotos = (e) => {
        e.preventDefault();
    }
return (
  <div className='d-flex align-items-center vh-75'>
    <main>
    <h1>Profile</h1>
    <h2>Current Friends</h2>
            <div className="list-of-friends">
              {/* Display the user's current friends list */}
    </div>
    <h5>Search for Your Photos</h5>
    <input type="search" placeholder='Search photo tag' onChange={Change} value={searchInput}/>
    <button onClick={FindPhotos} class='btn btn-success w-150 rounded-0'>Search</button>

    <h2 className="your-photos">Your Photos</h2>
    <div class="btn-group">
        <button onClick={addPhoto} class='btn btn-success w-150 rounded-0'>Upload Photo</button>
        <button onClick={deletePhoto} class='btn btn-danger w-150 rounded-0'>Delete Photo</button>
    </div>
    <div>{/* List users photos here */}</div>
    <h2 className="your-albums">Your Albums</h2>
    <div class="btn-group">
        <button onClick={addAlbum} class='btn btn-success w-150 rounded-0'>Upload Album</button>
        <button onClick={deleteAlbum} class='btn btn-danger w-150 rounded-0'>Delete Album</button>
    </div>
    <div>{/* List users albums here */}</div>
    </main>
  </div>

)
}

export default Profile