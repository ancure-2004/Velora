import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const UserDataContext = createContext()

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => {
        console.error('Auto-login failed:', err)
        localStorage.removeItem('token')
      })
      .finally(() => {
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <UserDataContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserContext
