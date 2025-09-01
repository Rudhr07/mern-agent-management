import React, { useState } from 'react';
import API from '../services/api';

const AgentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { name, email, mobile, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!mobile.trim()) newErrors.mobile = 'Mobile number is required';
    else if (!/^\+91[6-9]\d{9}$/.test(mobile)) newErrors.mobile = 'Mobile must be +91 followed by 10 digits';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    return newErrors;
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    try {
      await API.post('/api/agents', formData);
      setMessage('Agent created successfully');
      setFormData({ name: '', email: '', mobile: '', password: '' });
      setErrors({});
      setError('');
      // Refresh the page to show the new agent in the list
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating agent');
      setMessage('');
    }
    setLoading(false);
  };

  return (
    <div className="cstech-card">
      <div className="card-header">
        <h3>Create New Agent</h3>
      </div>
      <div className="card-body">
        {message && (
          <div className="alert-success">
            ✓ {message}
          </div>
        )}
        {error && (
          <div className="alert-error">
            ⚠ {error}
          </div>
        )}
        
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              className="form-control"
              placeholder="Enter agent's full name"
            />
            {errors.name && (
              <div style={{ color: 'var(--red-primary)', fontSize: '12px', marginTop: '5px' }}>
                {errors.name}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="form-control"
              placeholder="Enter agent's email"
            />
            {errors.email && (
              <div style={{ color: 'var(--red-primary)', fontSize: '12px', marginTop: '5px' }}>
                {errors.email}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label className="form-label">Mobile Number *</label>
            <input
              type="text"
              name="mobile"
              value={mobile}
              onChange={onChange}
              className="form-control"
              placeholder="+91 1234567890"
            />
            {errors.mobile && (
              <div style={{ color: 'var(--red-primary)', fontSize: '12px', marginTop: '5px' }}>
                {errors.mobile}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label className="form-label">Password *</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="form-control"
              placeholder="Set a password for the agent (min. 6 characters)"
            />
            {errors.password && (
              <div style={{ color: 'var(--red-primary)', fontSize: '12px', marginTop: '5px' }}>
                {errors.password}
              </div>
            )}
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary"
            style={{width: '100%'}}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Creating Agent...
              </>
            ) : (
              'Create Agent'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgentForm;