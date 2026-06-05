import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import Associations from './pages/Associations';
import AssociationDetail from './pages/AssociationDetail';
import Orders from './pages/Orders';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <>
                <Navigation />
                <Dashboard />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/marketplace"
          element={
            <PrivateRoute>
              <>
                <Navigation />
                <Marketplace />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/associations"
          element={
            <PrivateRoute>
              <>
                <Navigation />
                <Associations />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/associations/:id"
          element={
            <PrivateRoute>
              <>
                <Navigation />
                <AssociationDetail />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <>
                <Navigation />
                <Orders />
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
