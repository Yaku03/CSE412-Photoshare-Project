import React, { useState } from 'react'
import axios from 'axios';

function Profile() {

    const [period, setPeriod] = useState(0);

    const [friends, setFriends] = useState([]);
    const handleFindFriends = (e) => {
        const unpacked = {
            uid1: 1
        }
        axios.post('http://localhost:3001/api/allfriends', unpacked)
        .then(response => {
            console.log("Response data: " + JSON.stringify(response.data));
            setFriends(response.data);
          })
    }
    //add photo uploading here

    const [photoUrl, setPhotoUrl] = useState('');
    const [photoCaption, setPhotoCaption] = useState('');
    const [photoAlbum, setPhotoAlbum] = useState('');
    const [photoAlbumID, setPhotoAlbumID] = useState([]);
    const [photoID, setPhotoID] = useState([]);
    const [photoTag, setPhotoTag] = useState('');

    const addPhoto = (e) => {
      e.preventDefault();
      const unpacked = {
        data: photoUrl,
        caption: photoCaption
      }

      axios.post('http://localhost:3001/api/photo', unpacked)

              
      axios.post('http://localhost:3001/api/pid', unpacked).then(response => {
        console.log("Response data: " + JSON.stringify(response.data));
        setPhotoID(response.data);
      })

        const newUnpacked = {
            name: photoAlbum
        }
        axios.post('http://localhost:3001/api/aid', newUnpacked).then(response => {
            console.log("Response data: " + JSON.stringify(response.data));
            setPhotoAlbumID(response.data);
          })

        
        const parameters = {
            aid: 46,
            pid: 27
        }
        axios.post('http://localhost:3001/api/contains', parameters)

        // const tagParameters = {
        //     pid: 25,
        //     descriptor: photoTag
        // }
        // axios.post('http://localhost:3001/api/tagged', tagParameters)

    }

    const addTag = (e) => {
        e.preventDefault();
        const tagParameters = {
            pid: 27,
            descriptor: photoTag
        }
        axios.post('http://localhost:3001/api/tagged', tagParameters)
    }
    //add photo deleting here
    const deletePhoto = (e) => {
        e.preventDefault();
        const unpacked = {
            pid: 25
        }
        axios.post('http://localhost:3001/api/delPhoto', unpacked)
    }
    //add album uploading here
    const [albumName, setAlbumName] = useState('');
    const[albumId, setAlbumId] = useState([]);
    const addAlbum = (e) => {
        e.preventDefault();
        let today = new Date();
        let yyyy = today.getFullYear();
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let dd = String(today.getDate()).padStart(2, '0');
        today = yyyy + '/' + mm + '/' + dd;
        const unpacked = {
            name: albumName,
            date: today
        }
        axios.post('http://localhost:3001/api/album', unpacked)
        console.log("Album Name" + albumName);
        const newUnpacked = {
            name: albumName
        }
        axios.post('http://localhost:3001/api/aid', newUnpacked).then(response => {
            console.log("Response data: " + JSON.stringify(response.data));
            setAlbumId(response.data);
            console.log("Album ID: " + albumId);
          })

        const parameters = {
            uid: 1,
            aid: 46
        }
        axios.post('http://localhost:3001/api/owner', parameters).then(response => {
        console.log("Response data: " + JSON.stringify(response.data));
        })
    }



    //add album deleting here
    const deleteAlbum = (e) => {
        e.preventDefault();
        const unpacked = {
            name: albumName,
        }
        axios.post('http://localhost:3001/api/delAlbum', unpacked)
    }


    // Handle user photo search
    const [tag, setPhotoInput] = useState("");
    const [photos, setPhotos] = useState([]);
    const FindPhotos = (e) => {
      e.preventDefault();
      const unpacked = {
        uid: 1,
        descriptor: tag
      }
      for (const key in unpacked) {
        console.log(`${key}: ${unpacked[key]}`);
      }
      axios.post('http://localhost:3001/api/userPhotos', unpacked)
      .then(response => {
        console.log("Response data: " + JSON.stringify(response.data));
        setPhotos(response.data);
      })
    }

    const [userAlbums, setAlbums] = useState([]);
    const showAlbums = (e) => {
        e.preventDefault();
        const unpacked = {
            uid: 1
          }
        axios.post('http://localhost:3001/api/userAlbum', unpacked)
            .then(response => {
        console.log("Response data: " + JSON.stringify(response.data));
        setAlbums(response.data);
      })

    }

    const [activeButton, setActiveButton] = useState(null);
    const [albumPhotos, setAlbumPhotos] = useState([]);
    const showAlbumPhotos = (item) => {
        setActiveButton(item.aid);
        const unpacked = {
            aid: item.aid
          }
        for (const key in unpacked) {
            console.log(`${key}: ${unpacked[key]}`);
        }
        axios.post('http://localhost:3001/api/photoAlbum', unpacked)
            .then(response => {
        console.log("Response data: " + JSON.stringify(response.data));
        setAlbumPhotos(response.data);
      })

    }
return (
  <div className='d-flex align-items-center vh-75'>
    <main>
    <h1>Profile</h1>
    <h2>Current Friends</h2>
            <div className="list-of-friends">
            <button onClick={handleFindFriends} class='btn btn-success w-150 rounded-0'>Display Friends</button>
            <view style={{display:'flex',flexDirection: 'row', flexWrap:'wrap', listStyle: 'none', gap: '1rem'}}>
            {friends.map(item => (
                <li key={item.id}>
                <p>First Name: {item.fname}</p>
                <p>Last Name: {item.lname}</p>
                <p>Hometown: {item.hometown}</p>
                </li>
                ))}
            </view>
    </div>
    <h5>Search for Your Photos</h5>
    <input type="search" placeholder='Search photo tag' onChange={e => setPhotoInput(e.target.value)}/>
    <button onClick={FindPhotos} class='btn btn-success w-150 rounded-0'>Search</button>
    {photos.map(item => (
                <view style={{display:'flex',flexDirection: 'column', flexWrap:'nowrap', width:275, listStyle: 'none'}}>
                  <li key={item.id}>
                  <img style = {{height:256, width:256, padding:10}} src={item.data}/>
                  <p>{item.caption}</p>
                  </li>
                </view>
            ))}
    <h2 className="your-albums">Your Albums</h2>
    <input type="text" placeholder="Enter album name" id="album-name" class="form-control w-150 rounded-0" onChange={e => setAlbumName(e.target.value)}/>
    <div class="btn-group">
        <button onClick={addAlbum} class='btn btn-success w-150 rounded-0'>Upload Album</button>
        <button onClick={deleteAlbum} class='btn btn-danger w-150 rounded-0'>Delete Album</button>
    </div>
    <div>{/* List users albums here */}</div>
    <h2 className="your-photos">Your Photos</h2>
    <input type="text" placeholder="Enter URL" class="form-control w-150 rounded-0" onChange={e => setPhotoUrl(e.target.value)}/>
    <input type="text" placeholder="Enter caption" class="form-control w-150 rounded-0" onChange={e => setPhotoCaption(e.target.value)}/>
    <input type="text" placeholder="Enter album" class="form-control w-150 rounded-0" onChange={e => setPhotoAlbum(e.target.value)}/>
    <div class="btn-group">
        <button onClick={addPhoto} class='btn btn-success w-150 rounded-0'>Upload Photo</button>
        <button onClick={deletePhoto} class='btn btn-danger w-150 rounded-0'>Delete Photo</button>
    </div>
    <input type="text" placeholder="Enter tag" class="form-control w-150 rounded-0" onChange={e => setPhotoTag(e.target.value)}/>
    <button onClick={addTag} class='btn btn-success w-150 rounded-0'>Tag Photo</button>
    <button onClick={showAlbums} class='btn btn-success w-150 rounded-0'>View Albums</button>
    {userAlbums.map(item => (
                <view style={{display:'flex',flexDirection: 'column', flexWrap:'nowrap', width:275, listStyle: 'none'}}>
                  <li key={item.id}>
                  <p>{item.name}</p>
                  </li>
                  <td>
                    <button style={{marginRight: '10px', padding: '5px 5px', borderRadius: '5px',}} 
                    onClick={() => showAlbumPhotos(item)}> View Photos </button>
                     {activeButton === item.aid && albumPhotos.map(item => (
                        <view style={{display:'flex',flexDirection: 'column', flexWrap:'nowrap', width:275, listStyle: 'none'}}>
                        <li key={item.id}>
                        <img style = {{height:256, width:256, padding:10}} src={item.data}/>
                        <p>{item.caption}</p>
                        </li>
                        </view>
            ))}
                  </td>
                </view>
                
            ))}
    </main>
  </div>

)
}

export default Profile