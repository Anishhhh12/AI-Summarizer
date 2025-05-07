import { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { logout } from '../firebase';

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const linkBase =
    "relative text-gray-700 transition-all duration-300 ease-in-out hover:text-blue-600 font-medium";
  
  const activeUnderline =
    "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-blue-600";

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:scale-105 transition-transform"
        >
          AI Summarizer
        </Link>

        {/* Hamburger Icon */}
        <div
          className="md:hidden cursor-pointer w-8 h-6 relative"
          onClick={toggleMenu}
        >
          <span
            className={`absolute h-1 w-full bg-gray-700 rounded transition-transform duration-300 ${menuOpen ? "rotate-45 top-2.5" : "top-0"}`}
          />
          <span
            className={`absolute h-1 w-full bg-gray-700 rounded transition-opacity duration-300 ${menuOpen ? "opacity-0" : "top-2.5"}`}
          />
          <span
            className={`absolute h-1 w-full bg-gray-700 rounded transition-transform duration-300 ${menuOpen ? "-rotate-45 top-2.5" : "top-5"}`}
          />
        </div>

        {/* Navigation Links */}
        <div className={`md:flex md:space-x-6 md:items-center text-sm sm:text-base absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent transition-all duration-300 ease-in-out z-40 overflow-hidden ${menuOpen ? 'flex flex-col items-start gap-4 px-6 py-4 max-h-96' : 'hidden md:flex'}`}>

          {!user ? (
            <>
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? "text-blue-600 " + activeUnderline : "text-gray-700"} my-2 md:my-0`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? "text-blue-600 " + activeUnderline : "text-gray-700"} my-2 md:my-0`
                }
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/summarizer"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? "text-blue-600 " + activeUnderline : "text-gray-700"} my-2 md:my-0`
                }
              >
                Summarizer
              </NavLink>
              <NavLink
                to="/feedback"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? "text-blue-600 " + activeUnderline : "text-gray-700"} my-2 md:my-0`
                }
              >
                Feedback
              </NavLink>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="text-gray-700 hover:text-red-600 transition-transform hover:scale-105 my-2 md:my-0"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
