import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Static credentials
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'Uma@12051997';

    // Simulate a small delay for better UX
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Store authentication in localStorage
        localStorage.setItem('uma_tyres_auth', 'true');
        localStorage.setItem('uma_tyres_user', username);
        onLogin();
      } else {
        setError('Invalid username or password');
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>🚗 UMA Tyres</h1>
          <p>Inventory Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="login-error">
              <span>⚠️ {error}</span>
            </div>
          )}

          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              autoFocus
              disabled={loading}
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : '🔐 Login'}
          </button>
        </form>

        <div className="login-footer">
          <p>Professional Tyre Shop Management</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
