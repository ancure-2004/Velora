import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainProtectedWrapper = ({children}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)
    const { captain, setCaptain } = React.useContext(CaptainDataContext)
    
    useEffect(() => {
        if(!token) {
            navigate('/captain-login')
        }
    }, [token, navigate])

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
      if(response.status === 200) {
        const data = response.data
        setCaptain(data.captain)
        setIsLoading(false)
      }
    }).catch(err => {
      console.log('Error fetching captain profile:', err)
      localStorage.removeItem('token')
      setCaptain(null)
      navigate('/captain-login')
    })

    if(isLoading){
      return (
        <div>
          Loading...
        </div>
      )
    }
  

  return (
    <>
      {children}
    </>
  )
}

export default CaptainProtectedWrapper
