import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const [allUrls, setUrls] = useState([]);
  const RetrieveUrls = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/featured')
    .then(response => {
      console.log("Response data: " + JSON.stringify(response.data));
      setUrls(response.data);
      console.log(allUrls);
    })
  }

  const [activeButton, setActiveButton] = useState(null);
  const [allLikes, setTotalLikes] = useState([]);
  const [totalLikes, setAllLikes] = useState('');

  const likePhoto = (item) => {
    setActiveButton(item.pid);
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
      console.log("Total likes: " + allLikes[0].total_likes);
      setAllLikes(allLikes[0].total_likes);
    })
  }

  const [activeComment, setActiveCommentButton] = useState(null);
  const [commentInput, setCommentInput] = useState("");
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

    return (
        <div>
          <header>
            <h1>Welcome to PhotoShare</h1>
            <nav>
              <ul>
                <li><a href="/explore">Explore</a></li>
                <li><a href="/friends">Friends</a></li>
                <li><a href="/profile">Profile</a></li>
                <li><a href="/leaderboard">Leaderboard</a></li>
              </ul>
            </nav>
          </header>
          <main>
            <h2>Featured Photos</h2>  
            <div className="featured-photos">
              <button onClick={RetrieveUrls} class='btn btn-success w-150 rounded-0'>View</button>
              <view style={{display:'flex',flexDirection: 'row', flexWrap:'wrap', listStyle: 'none'}}>
              {allUrls.map(item => (
                <view style={{display:'flex',flexDirection: 'column', flexWrap:'nowrap', width:275, listStyle: 'none'}}>
                  <li key={item.id}>
                  <img style = {{height:256, width:256, padding:10}} src={item.data}/>
                  <p>{item.caption}</p>
                  <p>Likes: {activeButton === item.pid && totalLikes}</p>
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
          </main>
          <footer>
            <p>&copy; 2023 PhotoShare. All rights reserved.</p>
          </footer>
        </div>
      );
}
export default Home