import React, { useState } from 'react';
import API from '../services/api';

const UploadList = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const onFileChange = e => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await API.post('/api/lists/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(res.data.message);
      setError('');
      setFile(null);
      setFileName('');
      document.getElementById('file-input').value = '';
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading file');
      setMessage('');
    }
    setLoading(false);
  };

  const clearFile = () => {
    setFile(null);
    setFileName('');
    document.getElementById('file-input').value = '';
  };

  return (
    <div className="card">
      <h2>Upload Customer List</h2>
      <p style={styles.subtitle}>Upload a CSV or Excel file to distribute contacts to agents</p>
      
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={onSubmit} style={styles.form}>
        <div style={styles.uploadArea}>
          <input
            id="file-input"
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={onFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="file-input" style={styles.uploadLabel}>
            <div style={styles.uploadContent}>
              <div style={styles.uploadIcon}>📁</div>
              <p>Choose CSV or Excel file</p>
              <small>Supported formats: .csv, .xlsx, .xls</small>
            </div>
          </label>
          
          {fileName && (
            <div style={styles.fileInfo}>
              <span>Selected: {fileName}</span>
              <button type="button" onClick={clearFile} style={styles.clearButton}>
                ×
              </button>
            </div>
          )}
        </div>
        
        <div style={styles.requirements}>
          <h4>File Requirements:</h4>
          <ul>
            <li>Columns must include: <strong>FirstName, Phone, Notes</strong></li>
            <li>First row should contain headers</li>
            <li>Maximum file size: 5MB</li>
          </ul>
        </div>
        
        <button 
          type="submit" 
          disabled={loading || !file}
          className="btn btn-primary"
          style={styles.uploadButton}
        >
          {loading ? (
            <>
              <div style={styles.spinner}></div>
              Uploading...
            </>
          ) : (
            'Upload and Distribute'
          )}
        </button>
      </form>
    </div>
  );
};

const styles = {
  subtitle: {
    color: '#7f8c8d',
    marginBottom: '20px'
  },
  form: {
    maxWidth: '600px'
  },
  uploadArea: {
    marginBottom: '20px'
  },
  uploadLabel: {
    display: 'block',
    padding: '40px 20px',
    border: '2px dashed #ddd',
    borderRadius: '8px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.3s'
  },
  uploadContent: {
    color: '#7f8c8d'
  },
  uploadIcon: {
    fontSize: '40px',
    marginBottom: '10px'
  },
  fileInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    marginTop: '10px'
  },
  clearButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#7f8c8d'
  },
  requirements: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '6px',
    marginBottom: '20px'
  },
  uploadButton: {
    width: '100%',
    padding: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px'
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid transparent',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }
};

export default UploadList;