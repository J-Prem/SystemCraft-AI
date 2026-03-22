import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProjectDetail from './pages/ProjectDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import AiArchitect from './pages/AiArchitect';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import useAuthStore from './store/useAuthStore';
import './styles/App.css';

const App = () => {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
          
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/dashboard" element={<Layout onLogout={logout}><Dashboard /></Layout>} />
            <Route path="/project/:id" element={<Layout onLogout={logout}><ProjectDetail /></Layout>} />
            <Route path="/ai-architect" element={<Layout onLogout={logout}><AiArchitect /></Layout>} />
          </Route>

          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
