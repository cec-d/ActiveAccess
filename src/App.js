import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Note the change here
import HomePage from './HomePage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ClassesPage from './components/ClassesPage';
import { AuthProvider } from './context/AuthContext';
// Import other pages here

function App() {
  return (
    <AuthProvider> {/* Wrap your components with AuthProvider */}
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} /> {/* Add route for Login */}
            <Route path="/register" element={<Register />} /> {/* Add route for Register */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/classes" element={<ClassesPage />} />
            {/* You can define more routes here */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;