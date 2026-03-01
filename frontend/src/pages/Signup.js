import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Registration page
 * Creates a new user in backend and stores token
 */
const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data))
        navigate('/')
      } else {
        setError(data.error || 'Unexpected error')
      }
    } catch (err) {
      console.error('Network error signing up:', err)
      setError('Unable to reach server')
    }
  }

  return (
    <div className="auth-page">
      <h2>Sign Up</h2>
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
        <button type="submit">Create Account</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Signup
