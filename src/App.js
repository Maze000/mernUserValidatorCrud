import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from '../components/Signup';
import Login from '../components/Login';
import Logout from '../components/Logout';
import Dashboard from '../components/Dashboard';
import PrivateRoute from '../auth/PrivateRoute';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<PrivateRoute><Logout /><Dashboard /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

