// src/pages/Login.js
import React, { useState } from 'react';
import { loginUser } from '../utils/api'; // Import your API function
import { useNavigate } from 'react-router-dom';
import Navbar1 from '../components/Navbar1'; // Import the Navbar component

const Login = ({ onLogin }) => { // Accept onLogin prop
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize navigate for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ email, password });
            console.log('Login successful:', response);
            
            // Store the token and user information in local storage
            localStorage.setItem('email', email);
            localStorage.setItem('username', response.username);
            localStorage.setItem('token', response.token);
            localStorage.setItem('userid', response.userDetail._id);

            console.log('Id:', response.userDetail._id);
            
            // Call the onLogin function passed from the App component
            onLogin(); // Update authentication status in App component
            
            // Redirect to the home page after successful login
            navigate('/home'); // Use navigate to go to the homepage
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            console.error('Login error:', error);
        }
    };

    // Inline styles for the page and form container
    const pageStyle = {
        backgroundImage: 'url("https://th.bing.com/th/id/R.3d759db316482951a28a92935ef5ccdd?rik=t0O1J%2bYlFOjpMw&riu=http%3a%2f%2fc8.alamy.com%2fcomp%2fA41M2D%2fconcert-hall-of-hong-kong-culture-centre-china-A41M2D.jpg&ehk=VQhjoTVA%2bssd2UdoeaKOoyX1FR0s85yNX%2b3hiZOSz6U%3d&risl=&pid=ImgRaw&r=0")', // Set background image
        backgroundSize: 'cover', // Cover the entire viewport
        backgroundPosition: 'center', // Center the image
        height: '100vh', // Full height of the viewport
        display: 'flex', // Use flexbox to center the form
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        position: 'relative', // Position relative for the overlay
        color: 'white', // Default text color
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
        zIndex: 1, // Overlay above background
    };

    return (
        <div style={pageStyle}>
            <div style={overlayStyle} /> {/* Overlay for better text visibility */}
            <div style={{ width: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.8)', zIndex: 2 }}>
                <Navbar1 /> {/* Include the Navbar here */}
                <h4 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Login</h4>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                        <input
                            type="email"
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                        <input
                            type="password"
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: 'white', fontSize: '16px', cursor: 'pointer' }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
