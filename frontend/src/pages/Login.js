import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Login Page
 * Simple form that sends credentials to the backend and stores token on success
 */
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (response.ok) {
        // save token/email and navigate to home
        localStorage.setItem('user', JSON.stringify(data))
        navigate('/')
      } else {
        setError(data.error || 'Unexpected error')
      }
    } catch (err) {
      console.error('Network error logging in:', err)
      setError('Unable to reach server')
    }
  }

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </label>
        <button type="submit">Log In</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Login
