// src/Register.js
import React, { useState } from 'react';
import { registerUser } from '../utils/api';
import Navbar1 from '../components/Navbar1';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);

        try {
            const response = await registerUser({
                username,
                email,
                password,
                phonenumber,
                firstname,
                lastname,
                location,
            });

            console.log('Registration successful:', response);
            setSuccessMessage('Registration successful!');

            // Reset form fields
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setPhonenumber('');
            setFirstname('');
            setLastname('');
            setLocation('');
            setError('');

        } catch (error) {
            setError('Registration failed. Please try again.');
            console.error('Registration error:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    // Inline styles for the page and form container
    const pageStyle = {
        backgroundImage: 'url("https://th.bing.com/th/id/R.3d759db316482951a28a92935ef5ccdd?rik=t0O1J%2bYlFOjpMw&riu=http%3a%2f%2fc8.alamy.com%2fcomp%2fA41M2D%2fconcert-hall-of-hong-kong-culture-centre-china-A41M2D.jpg&ehk=VQhjoTVA%2bssd2UdoeaKOoyX1FR0s85yNX%2b3hiZOSz6U%3d&risl=&pid=ImgRaw&r=0")', // Set background image
         // Background image URL
        backgroundSize: 'cover', // Cover the entire viewport
        backgroundPosition: 'center', // Center the image
        height: '180vh', // Full height of the viewport
        display: 'flex', // Use flexbox to center the form
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        position: 'relative', // Position relative for the overlay
        color: 'black', // Default text color
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
            <div style={{ width: '500px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.8)', zIndex: 2 }}>
                <Navbar1 /> {/* Include the Navbar here */}
                <br></br><h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Register</h3>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username</label>
                        <input
                            type="text"
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="firstname" style={{ display: 'block', marginBottom: '5px' }}>First Name</label>
                        <input
                            type="text"
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            id="firstname"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="lastname" style={{ display: 'block', marginBottom: '5px' }}>Last Name</label>
                        <input
                            type="text"
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            id="lastname"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            required
                        />
                    </div>
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
                        <label htmlFor="phonenumber" style={{ display: 'block', marginBottom: '5px' }}>Phone Number</label>
                        <input
                            type="text"
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            id="phonenumber"
                            value={phonenumber}
                            onChange={(e) => setPhonenumber(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="location" style={{ display: 'block', marginBottom: '5px' }}>Location</label>
                        <select
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        >
                            <option value="">Select your location</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Chennai">Chennai</option>
                        </select>
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
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>Confirm Password</label>
                        <input
                            type="password"
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: 'white', fontSize: '16px', cursor: 'pointer' }} disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
