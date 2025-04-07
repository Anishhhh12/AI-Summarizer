import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { username, email, password })
      navigate('/login')
    } catch (err) {
      alert('Signup failed')
    }
  }

  return (
        
    <div className="container mt-5">
    <div className="card p-4 shadow">
      <h2 className="mb-4 text-center">SignUp</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="form-control" />
      </div>
        <div className="mb-3">
          <input type="email" placeholder="Email" className="form-control"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <input type="password" placeholder="Password" className="form-control"
            value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">SignUp</button>
      </form>
    </div>
  </div>
  
  )
}

export default Signup