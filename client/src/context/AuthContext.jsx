import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/user`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setUser({ ...res.data, token })
      })
      .catch(err => {
        console.error("Token invalid or expired:", err.message)
        localStorage.removeItem('token')
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = (data) => {
    localStorage.setItem('token', data.token)
    setUser({ ...data })
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
