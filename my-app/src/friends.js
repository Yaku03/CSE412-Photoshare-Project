import React, { useState } from 'react';
import axios from 'axios';

function Friends() {

    const [friends, setFriends] = useState([]);
    
    const handleFindFriends = (e) => {
    axios.post('http://localhost:3001/api/findfriends')
    .then(response => {
        console.log("Response data: " + JSON.stringify(response.data));
        setFriends(response.data);
      })
    }

    const handleAddFriend = (item) => {
        console.log("Adding friend: " + item.uid);
        let today = new Date();
        let yyyy = today.getFullYear();
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let dd = String(today.getDate()).padStart(2, '0');
        today = yyyy + '/' + mm + '/' + dd;
        const unpacked = {
            uid1: 1,
            uid2: item.uid,
            date: today
        }
        axios.post('http://localhost:3001/api/friend', unpacked)
      };

    return (
        <div>
        <h5>Friends</h5>
          <button onClick={handleFindFriends}>Find Friends</button>
          <view style={{display:'flex',flexDirection: 'row', flexWrap:'wrap', listStyle: 'none', gap: '1rem'}}>
          {friends.map(item => (
              <li key={item.id}>
              <p>First Name: {item.fname}</p>
              <p>Last Name: {item.lname}</p>
              <p>Hometown: {item.hometown}</p>
              <button onClick={() => handleAddFriend(item)}>Add Friend</button>
              </li>
            ))}
            </view>
        </div>
      );
}

export default Friends