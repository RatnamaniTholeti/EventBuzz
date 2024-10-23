// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ setSearchTerm, onLocationSelect, selectedLocation }) => {
    const [searchInput, setSearchInput] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(searchInput);
    };

    return (
        <nav className="navbar bg-secondary navbar-expand-lg text-white" style={{ backgroundColor: '#e3f2fd', padding: '1rem', color: 'white' }}>
            <div className="container-fluid text-white">
                <Link className="navbar-brand text-white" to="/home" style={{ marginLeft: '1rem' }}>
                    EventBuzz
                </Link>
                <Form className="d-flex me-auto text-white" onSubmit={handleSearch}>
                    <Form.Control
                        type="search"
                        placeholder="Search Events"
                        className="me-2 custom-search-input"
                        aria-label="Search"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        style={{ width: '400px' }}
                    />
                </Form>

                <Button
                    variant="info"
                    onClick={() => setShowModal(true)}
                    style={{ marginLeft: '1rem', borderRadius: '25px', padding: '10px 20px' }}
                >
                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '5px' }} />
                    {selectedLocation || 'Select Location'}
                </Button>
            </div>
            <Link className="navbar-brand text-white" to="/" style={{ marginLeft: '1rem' }}>
                    Logout
                </Link>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Select Location</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column align-items-start">
                    {/* Add the 'All Locations' option */}
                    <Button
                        variant="outline-primary"
                        onClick={() => {
                            onLocationSelect(''); // Pass an empty string or null to indicate no filter
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
                        All Locations
                    </Button>
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

export default Navbar;
