// src/components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="text-center py-4">
            <p>&copy; {new Date().getFullYear()} BookMyShow</p>
        </footer>
    );
};

export default Footer;
