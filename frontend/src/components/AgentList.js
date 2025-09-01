import React, { useState, useEffect } from 'react';
import API from '../services/api';

const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingAgent, setEditingAgent] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });
  const [editErrors, setEditErrors] = useState({});

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await API.get('/api/agents');
      setAgents(res.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch agents');
    }
    setLoading(false);
  };

  const handleEditClick = (agent) => {
    setEditingAgent(agent._id);
    setEditFormData({
      name: agent.name,
      email: agent.email,
      mobile: agent.mobile,
      password: '' // Don't pre-fill password for security
    });
    setEditErrors({});
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = (data) => {
    const errors = {};
    
    if (!data.name.trim()) errors.name = 'Name is required';
    if (!data.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Email is invalid';
    if (!data.mobile.trim()) errors.mobile = 'Mobile number is required';
    else if (!/^\+91[6-9]\d{9}$/.test(data.mobile)) errors.mobile = 'Mobile must be +91 followed by 10 digits';
    if (editingAgent && data.password && data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    return errors;
  };

  const handleEditSubmit = async (agentId) => {
    const errors = validateForm(editFormData);
    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }

    try {
      await API.put(`/api/agents/${agentId}`, editFormData);
      setEditingAgent(null);
      setEditErrors({});
      fetchAgents(); // Refresh the list
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating agent');
    }
  };

  const handleDelete = async (agentId) => {
    if (!window.confirm('Are you sure you want to delete this agent?')) {
      return;
    }

    try {
      await API.delete(`/api/agents/${agentId}`);
      fetchAgents(); // Refresh the list
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting agent');
    }
  };

  const cancelEdit = () => {
    setEditingAgent(null);
    setEditErrors({});
  };

  if (loading) {
    return (
      <div className="loading" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <div className="loading-spinner"></div>
        <span>Loading agents...</span>
      </div>
    );
  }

  return (
    <div className="cstech-card" style={{ marginTop: '20px' }}>
      <div className="card-header">
        <h3>Agents List</h3>
      </div>
      <div className="card-body">
        {error && (
          <div className="alert-error" style={{ marginBottom: '20px' }}>
            {error}
          </div>
        )}
        
        {agents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-medium)' }}>
            No agents found. Create your first agent above.
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {agents.map(agent => (
                  <tr key={agent._id}>
                    <td>
                      {editingAgent === agent._id ? (
                        <div>
                          <input
                            type="text"
                            name="name"
                            value={editFormData.name}
                            onChange={handleEditChange}
                            className="form-control"
                            style={{ width: '100%' }}
                          />
                          {editErrors.name && (
                            <div style={{ color: 'var(--red-primary)', fontSize: '12px', marginTop: '5px' }}>
                              {editErrors.name}
                            </div>
                          )}
                        </div>
                      ) : (
                        agent.name
                      )}
                    </td>
                    <td>
                      {editingAgent === agent._id ? (
                        <div>
                          <input
                            type="email"
                            name="email"
                            value={editFormData.email}
                            onChange={handleEditChange}
                            className="form-control"
                            style={{ width: '100%' }}
                          />
                          {editErrors.email && (
                            <div style={{ color: 'var(--red-primary)', fontSize: '12px', marginTop: '5px' }}>
                              {editErrors.email}
                            </div>
                          )}
                        </div>
                      ) : (
                        agent.email
                      )}
                    </td>
                    <td>
                      {editingAgent === agent._id ? (
                        <div>
                          <input
                            type="text"
                            name="mobile"
                            value={editFormData.mobile}
                            onChange={handleEditChange}
                            className="form-control"
                            style={{ width: '100%' }}
                          />
                          {editErrors.mobile && (
                            <div style={{ color: 'var(--red-primary)', fontSize: '12px', marginTop: '5px' }}>
                              {editErrors.mobile}
                            </div>
                          )}
                        </div>
                      ) : (
                        agent.mobile
                      )}
                    </td>
                    <td>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        background: 'var(--green-success)',
                        color: 'white'
                      }}>
                        Active
                      </span>
                    </td>
                    <td>
                      {editingAgent === agent._id ? (
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            onClick={() => handleEditSubmit(agent._id)}
                            className="btn btn-primary"
                            style={{ padding: '5px 10px', fontSize: '12px' }}
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="btn"
                            style={{ 
                              padding: '5px 10px', 
                              fontSize: '12px',
                              background: 'var(--gray-light)',
                              color: 'var(--gray-dark)'
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            onClick={() => handleEditClick(agent)}
                            className="btn"
                            style={{ 
                              padding: '5px 10px', 
                              fontSize: '12px',
                              background: 'var(--blue-accent)',
                              color: 'white'
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(agent._id)}
                            className="btn"
                            style={{ 
                              padding: '5px 10px', 
                              fontSize: '12px',
                              background: 'var(--red-primary)',
                              color: 'white'
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentList;