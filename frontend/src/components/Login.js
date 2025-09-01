import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import Logo from './Logo';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="login-container fade-in">
      <div className="login-card">
        <div className="login-header">
          <Logo size="lg" showText={true} />
          <h3 style={{ margin: '1rem 0 0.5rem 0', color: 'white', fontWeight: '600' }}>
            Agent Management Portal
          </h3>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '0.875rem' }}>
            CSTech Infosolutions Private Limited
          </p>
        </div>
        
        <div className="login-body">
          {error && (
            <div className="alert-error">
              {error}
            </div>
          )}
          
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                className="form-control"
                placeholder="Enter your password"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary w-100"
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: '#F7FAFC',
            borderRadius: '8px',
            border: '1px solid #E2E8F0'
          }}>
            <h6 style={{ 
              margin: '0 0 0.5rem 0', 
              color: '#2D3748', 
              textAlign: 'center',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              Demo Credentials
            </h6>
            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#4A5568' }}>
              <div>Email: admin@example.com</div>
              <div>Password: admin123</div>
            </div>
          </div>
          
          <div className="footer">
            <div style={{ fontSize: '0.6875rem', color: '#A0AEC0' }}>
              Made by Rudhr Chauhan - Assignment for CSTech Infosolutions Private Limited
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;