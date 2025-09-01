import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    agents: 0,
    lists: 0,
    items: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [agentsRes, listsRes] = await Promise.all([
        API.get('/api/agents'),
        API.get('/api/lists')
      ]);
      
      const totalItems = listsRes.data.reduce((sum, list) => sum + list.items.length, 0);
      
      setStats({
        agents: agentsRes.data.length,
        lists: listsRes.data.length,
        items: totalItems
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div className="loading-spinner"></div>
        <span>Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">CSTech Agent Management Portal</h1>
        <div>Welcome to your management dashboard</div>
      </div>

      <div className="dashboard-grid">
        <div className="cstech-card">
          <div className="card-header">
            <h3>Total Agents</h3>
          </div>
          <div className="card-body stat-card">
            <div className="stat-number">{stats.agents}</div>
            <div className="stat-label">Registered Agents</div>
          </div>
        </div>

        <div className="cstech-card">
          <div className="card-header">
            <h3>Uploaded Lists</h3>
          </div>
          <div className="card-body stat-card">
            <div className="stat-number">{stats.lists}</div>
            <div className="stat-label">Customer Lists</div>
          </div>
        </div>

        <div className="cstech-card">
          <div className="card-header">
            <h3>Distributed Items</h3>
          </div>
          <div className="card-body stat-card">
            <div className="stat-number">{stats.items}</div>
            <div className="stat-label">Total Items Distributed</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="cstech-card">
          <div className="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/agents')}
              >
                Manage Agents
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/upload')}
              >
                Upload Lists
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/distributed')}
              >
                View Distribution
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        Made by Rudhr Chauhan - Assignment for CSTech Infosolutions Private Limited
      </div>
    </div>
  );
};

export default Dashboard;