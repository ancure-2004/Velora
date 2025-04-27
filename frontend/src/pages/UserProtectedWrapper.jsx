import React, {useContext, useEffect, useState} from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectedWrapper = ({children}) => {

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)
    const { user, setUser } = useContext(UserDataContext)

    useEffect(() => {
        if (!token) {
            navigate('/user-login')
        }
    }, [token, navigate])

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        if (response.status === 200) {
            const data = response.data
            setUser(data.user)
            setIsLoading(false)
        }
    }).catch(err => {
        console.log('Error fetching user profile:', err)
        localStorage.removeItem('token')
        setUser(null)
        navigate('/user-login')
    })

    if(isLoading) {
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

export default UserProtectedWrapper
