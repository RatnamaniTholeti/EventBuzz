// src/pages/EventDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { fetchEventById } from '../utils/api'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Initialize useNavigate
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getEvent = async () => {
            try {
                const data = await fetchEventById(id);
                console.log('Fetched event data:', data);

                if (!data) {
                    throw new Error('Event not found');
                }

                setEvent(data);
            } catch (error) {
                console.error('Error fetching event:', error);
                setError('Event not found');
            } finally {
                setLoading(false);
            }
        };

        getEvent();
    }, [id]);

    const handleBookClick = () => {
        // Navigate to Seat Selection page with event data
        navigate('/seat-selection', { state: { event } });
    };

    return (
        <div className="container">
            {loading ? (
                <p>Loading event...</p>
            ) : error ? (
                <h1>{error}</h1>
            ) : event ? (
                <>
                    <img src={event.imageUrl} className="img-fluid" alt={event.title} style={{ width: "1600px", height: "500px" }} />
                    <h2 className="my-4">{event.title}  <button 
                        onClick={handleBookClick}
                        style={{
                            backgroundColor: '#007bff', // Blue color
                            color: '#fff',
                            padding: '12px 24px',
                            fontSize: '16px',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s, transform 0.2s',
                            marginLeft:'580px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')} // Darker shade on hover
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007bff')} // Reset color on mouse leave
                        onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')} // Slightly shrink on click
                        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')} // Reset scale after click
                    >
                        Book
                    </button>
                    </h2> 
                    <p>{event.description} | {event.language}</p>
                    <hr />
                    <p>{new Date(event.dateTime).toLocaleString()} &nbsp;<FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '5px' }} />  {event.location} | Price: {event.price} rs</p>
                    <p><strong>Available Tickets:</strong> {event.availableTickets}</p>
                    
                    {/* Styled "BOOK" Button */}
                   
                </>
            ) : (
                <h1>Event not found</h1>
            )}
        </div>
    );
};

export default EventDetails;
