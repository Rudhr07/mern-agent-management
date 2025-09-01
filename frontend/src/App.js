import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AgentForm from './components/AgentForm';
import AgentList from './components/AgentList';
import UploadList from './components/UploadList';
import DistributedLists from './components/DistributedLists';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/agents" 
            element={
              <PrivateRoute>
                <Layout>
                  <AgentForm />
                  <AgentList />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/upload" 
            element={
              <PrivateRoute>
                <Layout>
                  <UploadList />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/distributed" 
            element={
              <PrivateRoute>
                <Layout>
                  <DistributedLists />
                </Layout>
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;