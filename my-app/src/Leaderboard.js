import React, { useState } from 'react'

function Leaderboard() {

  const [period, setPeriod] = useState(0);

const handleClick = (e) => {
   
  setPeriod(e.target.dataset.id)
}

return (
  <div className='d-flex justify-content-center align-items-center vh-75'>
      <h1 className='leaderboard'>Leaderboard</h1>

  </div>
)
}

export default Leaderboard