// src/components/Navbar.js//homepage
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

const Navbar1 = ({ setSearchTerm, onLocationSelect, selectedLocation }) => {
  
    const [showModal, setShowModal] = useState(false);

    

    return (
        <nav className="navbar bg-secondary navbar-expand-lg text-white " style={{ backgroundColor: '#e3f2fd', padding: '1rem',color:'white' }}> {/* Change background color to white */}
            <div className="container-fluid text-white ">
                <Link className="navbar-brand text-white " to="/" style={{ marginLeft: '1rem' }}>
                    EventBuzz
                </Link>
               
               
                <ul className="navbar-nav text-white ">
                <li className="nav-item">
                        <Link className="nav-link text-white " to="/adminlogin">Admin</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white " to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white " to="/register">Register</Link>
                    </li>
                </ul>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Select Location</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column align-items-start">
                    {['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'].map((city) => (
                        <Button
                            key={city}
                            variant="outline-primary"
                            onClick={() => {
                                onLocationSelect(city);
                                setShowModal(false);
                            }}
                            style={{
                                width: '100%',
                                marginBottom: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {city}
                        </Button>
                    ))}
                </Modal.Body>
            </Modal>
        </nav>
    );
};

export default Navbar1;
