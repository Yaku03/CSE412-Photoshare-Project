import React from 'react'
import Login from './login' //change
import Signup from './signup'
import Home from './home'
import Leaderboard from './Leaderboard'
import Profile from './profile'
import Explore from './explore'
import Friends from './friends'

import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = '/' element={<Login />}></Route>
      <Route path = '/signup' element = {<Signup />}></Route>
      <Route path = '/home' element = {<Home/>}></Route>
      <Route path = '/leaderboard' element = {<Leaderboard/>}></Route>
      <Route path = '/friends' element = {<Friends/>}></Route>
      <Route path = '/profile' element = {<Profile/>}></Route>
      <Route path = '/explore' element = {<Explore/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
