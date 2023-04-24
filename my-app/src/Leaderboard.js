import React, { useState } from 'react';
import axios from 'axios';

function Leaderboard() {

const [leaders, setLeaders] = useState([]);
const handleClick = (e) => {
  e.preventDefault();
  axios.post('http://localhost:3001/api/leaderboard')
  .then(response => {
    console.log("Response data: " + JSON.stringify(response.data));
    setLeaders(response.data);
  })
}

return (
  <view style={{display:'flex',flexDirection: 'column', flexWrap:'nowrap'}}>
      <h1 className='leaderboard'>Leaderboard</h1>
      <button onClick={handleClick} class='btn btn-success w-25 rounded-0'>Leaderboard</button>
      <table>
      <thead>
        <tr>
          <th>UID</th>
          <th>Total Count</th>
        </tr>
      </thead>
      <tbody>
        {leaders.map((item) => (
          <tr key={item.uid}>
            <td>{item.uid}</td>
            <td>{item.total_count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </view>
)
}

export default Leaderboard