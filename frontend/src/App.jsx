import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Start from './pages/Start'
import Home from './pages/Home'
import Userlogin from './pages/Userlogin'
import UserSignup from './pages/UserSignup'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogout from './pages/CaptainLogout'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

const App = () => {
  return (
    <div>
      <Routes>
        
        <Route path='/' element={<Start />}/>

        <Route path='/user-login' element={<Userlogin />}/>

        <Route path='/user-signup' element={<UserSignup />}/>

        <Route path='/captain-login' element={<Captainlogin />}/>

        <Route path='/captain-signup' element={<CaptainSignup />}/>

        <Route path='/riding' element={<Riding />}/>

        <Route path='/captain-riding' element={<CaptainRiding />} />

        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        }/>

        <Route path='/user/logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />

        <Route path='/captain-home' element={
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>
        }/>

        <Route path='/captain/logout' element={
          <CaptainProtectedWrapper>
            <CaptainLogout />
          </CaptainProtectedWrapper>
        } />

      </Routes>
    </div>
  )
}

export default App
