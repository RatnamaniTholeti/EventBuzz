// src/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar1 from '../components/Navbar1';

const HomePage = () => {
    // Inline styles for the page
    const pageStyle = {
        backgroundImage: 'url("https://th.bing.com/th/id/R.3d759db316482951a28a92935ef5ccdd?rik=t0O1J%2bYlFOjpMw&riu=http%3a%2f%2fc8.alamy.com%2fcomp%2fA41M2D%2fconcert-hall-of-hong-kong-culture-centre-china-A41M2D.jpg&ehk=VQhjoTVA%2bssd2UdoeaKOoyX1FR0s85yNX%2b3hiZOSz6U%3d&risl=&pid=ImgRaw&r=0")', // Set background image
        backgroundSize: 'cover', // Cover the entire viewport
        backgroundPosition: 'center', // Center the image
        height: '100vh', // Full height of the viewport
        display: 'flex', // Flexbox for centering content
        flexDirection: 'column', // Stack content vertically
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        color: 'white', // Text color
        textAlign: 'center', // Center text
        padding: '20px', // Padding for responsiveness
        position: 'relative', // Position relative for the overlay
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
        zIndex: 1, // Place overlay above background
    };

    return (
        <div>
            <Navbar1 /> {/* Include Navbar1 here */}

        <div style={pageStyle}>
            <div style={overlayStyle} /> {/* Overlay for better text visibility */}
            <h1 style={{ fontSize: '48px', marginBottom: '20px', zIndex: 2 }}>EventBuzz</h1>
            <p style={{ fontSize: '24px', marginBottom: '30px', zIndex: 2 }}>
            Get the buzz on trending events and secure your spot at the most exciting shows!
            </p>
            <Link 
                to="/login" 
                style={{
                    textDecoration: 'none', 
                    color: '#007bff', 
                    fontSize: '20px', 
                    padding: '10px 20px', 
                    border: '2px solid #007bff', 
                    borderRadius: '4px', 
                    transition: 'background-color 0.3s', 
                    zIndex: 2,
                    backgroundColor: 'white', // Button background color
                }}
            >
                Book Now
            </Link>
        </div>
        </div>
    );
};

export default HomePage;
