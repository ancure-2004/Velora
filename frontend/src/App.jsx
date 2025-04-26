import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Userlogin from './pages/Userlogin'
import UserSignup from './pages/UserSignup'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/user-login' element={<Userlogin />}/>
        <Route path='/user-signup' element={<UserSignup />}/>
        <Route path='/captain-login' element={<Captainlogin />}/>
        <Route path='/captain-signup' element={<CaptainSignup />}/>
      </Routes>
    </div>
  )
}

export default App
