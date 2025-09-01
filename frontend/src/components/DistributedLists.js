import React, { useState, useEffect } from 'react';
import API from '../services/api';

const DistributedLists = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedList, setExpandedList] = useState(null);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const res = await API.get('/api/lists');
      setLists(res.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch distributed lists');
    }
    setLoading(false);
  };

  const toggleList = (listId) => {
    if (expandedList === listId) {
      setExpandedList(null);
    } else {
      setExpandedList(listId);
    }
  };

  const getAgentStats = (items) => {
    const stats = {};
    items.forEach(item => {
      const agentName = item.agentId?.name || 'Unknown';
      stats[agentName] = (stats[agentName] || 0) + 1;
    });
    return stats;
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <h1>Distributed Lists</h1>
      {error && <div className="alert alert-error">{error}</div>}
      
      {lists.length === 0 ? (
        <div className="card">
          <div style={styles.noData}>
            <h3>No distributed lists found</h3>
            <p>Upload a CSV file to see the distribution here</p>
          </div>
        </div>
      ) : (
        lists.map(list => (
          <div key={list._id} className="card" style={styles.listCard}>
            <div 
              style={styles.listHeader}
              onClick={() => toggleList(list._id)}
            >
              <div style={styles.listInfo}>
                <h3>{list.originalFileName}</h3>
                <p>
                  {list.items.length} items • 
                  Distributed on: {new Date(list.distributedAt).toLocaleDateString()}
                </p>
              </div>
              <div style={styles.listStats}>
                <div style={styles.stat}>
                  <span style={styles.statNumber}>{list.items.length}</span>
                  <span style={styles.statLabel}>Total Items</span>
                </div>
                <div style={styles.stat}>
                  <span style={styles.statNumber}>
                    {new Set(list.items.map(item => item.agentId?._id)).size}
                  </span>
                  <span style={styles.statLabel}>Agents</span>
                </div>
                <button style={styles.toggleButton}>
                  {expandedList === list._id ? '▲' : '▼'}
                </button>
              </div>
            </div>

            {expandedList === list._id && (
              <div style={styles.listDetails}>
                <h4>Distribution Summary</h4>
                <div style={styles.agentSummary}>
                  {Object.entries(getAgentStats(list.items)).map(([agent, count]) => (
                    <div key={agent} style={styles.agentStat}>
                      <span style={styles.agentName}>{agent}</span>
                      <span style={styles.agentCount}>{count} items</span>
                    </div>
                  ))}
                </div>

                <h4>All Items</h4>
                <div style={styles.tableContainer}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Agent</th>
                        <th>First Name</th>
                        <th>Phone</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.items.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div style={styles.agentCell}>
                              <span style={styles.avatar}>👤</span>
                              {item.agentId?.name || 'Unknown'}
                            </div>
                          </td>
                          <td>{item.firstName}</td>
                          <td>{item.phone}</td>
                          <td>{item.notes || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  noData: {
    textAlign: 'center',
    padding: '40px',
    color: '#7f8c8d'
  },
  listCard: {
    marginBottom: '20px'
  },
  listHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '15px'
  },
  listInfo: {
    flex: 1
  },
  listStats: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  stat: {
    textAlign: 'center'
  },
  statNumber: {
    display: 'block',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#3498db'
  },
  statLabel: {
    display: 'block',
    fontSize: '12px',
    color: '#7f8c8d'
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '5px'
  },
  listDetails: {
    padding: '15px',
    borderTop: '1px solid #eee'
  },
  agentSummary: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '10px',
    marginBottom: '20px'
  },
  agentStat: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px'
  },
  agentName: {
    fontWeight: '500'
  },
  agentCount: {
    color: '#3498db',
    fontWeight: 'bold'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  agentCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  avatar: {
    fontSize: '14px'
  }
};

export default DistributedLists;