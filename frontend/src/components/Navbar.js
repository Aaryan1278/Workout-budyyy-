import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const stored = localStorage.getItem('user')
  const user = stored ? JSON.parse(stored) : null

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <header>
        <div className='container'>
            <Link to="/">
                <h1>Workout Budyy</h1>
            </Link>

            <nav>
              {user ? (
                <>
                  <span className="nav-email">{user.email}</span>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">Login</Link>
                  <Link to="/signup" className="nav-link">Sign Up</Link>
                </>
              )}
            </nav>
        </div>
    </header>
  )
}

export default Navbar