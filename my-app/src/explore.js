import React, { useState } from 'react';
import axios from 'axios';

function Explore() {

      //add finding friends based on name here
  const [email, setEmail] = useState('');

  const [tag, setPhotoInput] = useState("");

  const [commentInput, setCommentInput] = useState("");

  // Handle finding a user based on email search
  // const [user, setUser] = useState({
  //     email: ''
  // })
  const [user, setUser] = useState(null);
  const FindFriends = (e) => {
    e.preventDefault();
    const unpacked = {
      email: email
    }

    axios.post('http://localhost:3001/api/usersearch', unpacked)
    .then(response => {
      console.log("Response data: " + JSON.stringify(response.data));
      setUser(response.data[0]);
    })
  }
  //add finding photos based on tag here
  const [photos, setPhotos] = useState([]);
  const FindPhotos = (e) => {
    e.preventDefault();
    const unpacked = {
      descriptor: tag
    }
    for (const key in unpacked) {
      console.log(`${key}: ${unpacked[key]}`);
    }
    axios.post('http://localhost:3001/api/photosearch', unpacked)
    .then(response => {
      console.log("Response data: " + JSON.stringify(response.data));
      setPhotos(response.data);
    })
  }
  //add finding USERS based on comment text
  const [commentData, setCommentData] = useState([]);
  const FindComments = (e) => {
    e.preventDefault();
    const unpacked = {
      text: commentInput
    }
    for (const key in unpacked) {
      console.log(`${key}: ${unpacked[key]}`);
    }
    axios.post('http://localhost:3001/api/commentsearch', unpacked)
    .then(response => {
      console.log("Response data: " + JSON.stringify(response.data));
      setCommentData(response.data);
    })
  }

  const [popTags, setPoptags] = useState([]);
  const PopularTags = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/tagcount')
    .then(response => {
    console.log("Response data: " + JSON.stringify(response.data));
    setPoptags(response.data);
  })
  }

  const [activeButton, setActiveButton] = useState(null);
  const [taggedPhotos, setTaggedPhotos] = useState([]);
  const viewTaggedPhotos = (item) => {
    setActiveButton(item.descriptor);
    const unpacked = {
      descriptor: item.descriptor
    }
    axios.post('http://localhost:3001/api/taggedphotos', unpacked)
    .then(response => {
    console.log("Response data: " + JSON.stringify(response.data));
    setTaggedPhotos(response.data);
  })
  }

  const [friends, setFriends] = useState([]);
  const recommendFriends = (item) => {
    const unpacked = {
      uid1: 1
    }
    axios.post('http://localhost:3001/api/friendrec', unpacked)
    .then(response => {
    console.log("Response data: " + JSON.stringify(response.data));
    setFriends(response.data);
  })
  }

  const [recPosts, setRecPosts] = useState([]);
  const recommendPosts = (item) => {
    const unpacked = {
      uid: 1
    }
    axios.post('http://localhost:3001/api/tagrec', unpacked)
    .then(response => {
    console.log("Response data: " + JSON.stringify(response.data));
    setRecPosts(response.data);
  })
  }

  const [likeActiveButton, setLikeActiveButton] = useState(null);
  const [allLikes, setTotalLikes] = useState([]);
  const likePhoto = (item) => {
    setLikeActiveButton(item.pid);
    const unpacked = {
      uid: 1,
      pid: item.pid
    }
    axios.post('http://localhost:3001/api/like', unpacked)
    console.log(item.pid + " has been liked");  

    const parameter = {
      pid: item.pid
    }
    axios.post('http://localhost:3001/api/totallikes', parameter)
    .then(response => {
      console.log("Response data: " + JSON.stringify(response.data));
      setTotalLikes(response.data);
      console.log("Total likes not as array: " + allLikes[0].total_likes);
    })
  }

  const [activeComment, setActiveCommentButton] = useState(null);
  const[allComments, setAllComments] = useState([]);
  const AddComment = (item) => {
    let today = new Date();
    let yyyy = today.getFullYear();
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let dd = String(today.getDate()).padStart(2, '0');
    today = yyyy + '/' + mm + '/' + dd;
    console.log("Current PID: " + item.pid);
    //setActiveButton(item.pid);
    setActiveCommentButton(item.pid);
    console.log("Current ActiveComment: " + activeComment);
    const unpacked = {
      uid: 1,
      text: commentInput,
      date: today,
      pid: item.pid
    }

    axios.post('http://localhost:3001/api/comment', unpacked)

    const parameters = {
      pid: item.pid
    }

    axios.post('http://localhost:3001/api/allcomments', parameters)
    .then(response => {
      console.log("Response data: " + JSON.stringify(response.data));
      setAllComments(response.data);
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

    return(
        <div>
          <h5>Search for Friends</h5>
          <form action="" onSubmit={FindFriends}>
            <input type="text" placeholder='Search email' name = 'email'
            onChange={e => setEmail(e.target.value)}/>
            <button onClick={FindFriends} class='btn btn-success w-150 rounded-0'>Search</button>
              {user && (
                <div>
                  <p>Email: {user.email}</p>
                </div>
              )}
              </form>
          <h5>Search for Photos</h5>
            <input type="search" placeholder='Search photo tag' name = 'tag'
            onChange={e => setPhotoInput(e.target.value)} />
            <button onClick={FindPhotos} class='btn btn-success w-150 rounded-0'>Search</button>
            <view style={{display:'flex',flexDirection: 'row', flexWrap:'wrap', listStyle: 'none'}}>
            {photos.map(item => (
                <view style={{display:'flex',flexDirection: 'column', flexWrap:'nowrap', width:275, listStyle: 'none'}}>
                  <li key={item.id}>
                  <img style = {{height:256, width:256, padding:10}} src={item.data}/>
                  <p>{item.caption}</p>
                  </li>
                </view>
            ))}
              </view>
          <h5>Search for Comments</h5>
            <input type="search" placeholder='Search comment' onChange={e => setCommentInput(e.target.value)}/>
            <button onClick={FindComments} class='btn btn-success w-150 rounded-0'>Search</button>
            {commentData.map(item => (
              <li key={item.id}>
              <p>pid: {item.pid}</p>
              <p>text: {item.text}</p>
              </li>
            ))}
          <h5>View Popular Tags</h5>
            <button onClick={PopularTags} class='btn btn-success w-150 rounded-0'>View</button>
            <table>
              <thead>
                <tr>
                  <th>Tag</th>
                  <th>Tag Count</th>
                </tr>
              </thead>
              <tbody>
                {popTags.map((item) => (
                  <tr key={item.uid}>
                    <td>{item.descriptor}</td>
                    <td>{item.tagcount}</td>
                    <td>
                      <button onClick={() => viewTaggedPhotos(item)}>View {item.descriptor}</button>
                      <view style={{display:'flex',flexDirection: 'column', flexWrap:'nowrap', width:275, listStyle: 'none'}}>
                      {activeButton === item.descriptor && taggedPhotos.map(item => (
                      <li key={item.id}>
                      <img style = {{height:256, width:256, padding:10}} src={item.data}/>
                      <p>{item.caption}</p>
                      </li>
                    ))}
                    </view>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          <h2>You May Also Like</h2>
            <div className="you-may-also-like">
              <button onClick={recommendPosts}>Recommend</button>
              <view style={{display:'flex',flexDirection: 'row', flexWrap:'wrap', listStyle: 'none'}}>
                {recPosts.map(item => (
                <view style={{display:'flex',flexDirection: 'column', flexWrap:'nowrap', width:275, listStyle: 'none'}}>
                  <li key={item.id}>
                  <img style = {{height:256, width:256, padding:10}} src={item.data}/>
                  <p>{item.caption}</p>
                  <p>Likes: {likeActiveButton === item.pid && allLikes[0].total_likes}</p>
                  <view style={{display:'flex',flexDirection: 'column', flexWrap:'nowrap', width:275, listStyle: 'none'}}>
                  <p>Comments:</p>
                    <ul>
                      {allComments.filter(comment => item.pid === activeComment).map(comment => (
                        <li key={comment.id} style={{ display: 'block' }}>
                          <p>{comment.text}</p>
                        </li>
                      ))}
                    </ul>
                  </view>
                  <td>
                    <button style={{marginRight: '10px', padding: '5px 5px', borderRadius: '5px',}} 
                    onClick={() => likePhoto(item)}> Like </button>
                    <button style={{marginRight: '10px', padding: '5px 5px', borderRadius: '5px',}} 
                      onClick={() => AddComment(item)}> Comment </button>
                    <input type="text" placeholder='Comment' name = 'comment' onChange={e => setCommentInput(e.target.value)}/>
                  </td>
                  </li>
              </view>
                ))}
              </view>

            </div>
          <h2>Friend Recommendations</h2>
            <div className="you-may-also-like">
              <button onClick={recommendFriends}>Recommend</button>
              <view style={{display:'flex',flexDirection: 'row', flexWrap:'wrap', listStyle: 'none', gap: '1rem'}}>
              {friends.map(item => (
                <li key={item.id}>
                <p>First Name: {item.fname}</p>
                <p>Last Name: {item.lname}</p>
                <p>Hometown: {item.hometown}</p>
                <p>Mutual Friends: {item.shared_friends}</p>
                <button onClick={() => handleAddFriend(item)}>Add Friend</button>
                </li>
                ))}
            </view>
            </div>
        </div>
    )
}
export default Explore