import { useAuth } from '../context/AuthContext'
import { NavLink, Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">AI Summarizer</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {user && (
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `nav-link px-3 nav-link-underline ${isActive ? 'text-white fw-semibold' : 'text-light'}`
                  }
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
                  >
                    Feedback
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    onClick={() => { logout(); navigate('/login') }}
                    className="btn btn-outline-light ms-2"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link text-light px-3">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/signup" className="nav-link text-light px-3">Signup</NavLink>
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
