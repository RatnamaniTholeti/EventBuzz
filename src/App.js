import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer';
import Home from './pages/Home';
import EventList from './pages/EventList';
import EventDetails from './pages/EventDetails';
import SeatSelection from './components/SeatSelection';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookingConfirmation from './pages/BookingConfirmation';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Track user authentication status
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false); // Track admin authentication status

    // Handler for user login
    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    // Handler for admin login
    const handleAdminLogin = () => {
        console.log('Admin has logged in.');
        setIsAdminAuthenticated(true); // Update admin authentication status
    };

    // Handler for search term update
    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    // Handler for location selection update
    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
    };

    return (
        <Router>
            <AppContent 
                searchTerm={searchTerm} 
                handleSearch={handleSearch} 
                selectedLocation={selectedLocation} 
                handleLocationSelect={handleLocationSelect} 
                isAuthenticated={isAuthenticated}
                handleLogin={handleLogin} // Pass down the login handler
                isAdminAuthenticated={isAdminAuthenticated} // Pass down admin auth status
                handleAdminLogin={handleAdminLogin} // Pass down the admin login handler
            />
        </Router>
    );
};

const AppContent = ({ searchTerm, handleSearch, selectedLocation, handleLocationSelect, isAuthenticated, handleLogin, isAdminAuthenticated, handleAdminLogin }) => {
    const location = useLocation();
    
    // Determine the current route to conditionally render the navbar
    const isHomePage = location.pathname === '/';
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';
    const isAdminPage = location.pathname === '/admin';
    const isAdminLoginPage = location.pathname === '/adminlogin';

    return (
        <>
            {/* Render Navbar only if not on specific pages */}
            {!isHomePage && !isLoginPage && !isRegisterPage && !isAdminPage && !isAdminLoginPage && (
                <Navbar 
                    setSearchTerm={handleSearch} 
                    onLocationSelect={handleLocationSelect} 
                    selectedLocation={selectedLocation} 
                />
            )}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route 
                    path="/home" 
                    element={isAuthenticated ? <Home searchTerm={searchTerm} selectedLocation={selectedLocation} /> : <Navigate to="/" />} 
                />
                <Route 
                    path="/events" 
                    element={isAuthenticated ? <EventList /> : <Navigate to="/" />} 
                />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/seat-selection" element={<SeatSelection />} />
                <Route 
                    path="/login" 
                    element={<Login onLogin={handleLogin} />} 
                />
                <Route path="/register" element={<Register />} />
                <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                <Route 
                    path="/admin" 
                    element={isAdminAuthenticated ? <AdminDashboard /> : <Navigate to="/adminlogin" />} // Protect admin route
                /> 
                <Route path="/adminlogin" element={<AdminLogin onLogin={handleAdminLogin} />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
