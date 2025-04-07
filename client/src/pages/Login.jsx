import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password })

      // call context login — it handles setting localStorage
      login(res.data)

      // redirect to homepage
      navigate('/')
    } catch (err) {
      alert('Invalid credentials')
    }
  }

  return (
    <div className="container mt-5">
  <div className="card p-4 shadow">
    <h2 className="mb-4 text-center">Login</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input type="email" placeholder="Email" className="form-control"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-3">
        <input type="password" placeholder="Password" className="form-control"
          value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" className="btn btn-primary w-100">Login</button>
    </form>
  </div>
</div>

  )
}

export default Login
