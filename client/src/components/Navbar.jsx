import { useAuth } from '../context/AuthContext'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(true)

  const toggleNavbar = () => setIsCollapsed(!isCollapsed)

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">AI Summarizer</Link>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto">
            {user && (
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `nav-link px-3 nav-link-underline ${isActive ? 'text-white fw-semibold' : 'text-light'}`
                  }
                  onClick={toggleNavbar}
                >
                  Summarizer
                </NavLink>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/feedback"
                    className={({ isActive }) =>
                      `nav-link px-3 nav-link-underline ${isActive ? 'text-white fw-semibold' : 'text-light'}`
                    }
                    onClick={toggleNavbar}
                  >
                    Feedback
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    onClick={() => {
                      logout()
                      navigate('/login')
                      toggleNavbar()
                    }}
                    className="btn btn-outline-light ms-2"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link text-light px-3" onClick={toggleNavbar}>Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/signup" className="nav-link text-light px-3" onClick={toggleNavbar}>Signup</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
