// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchEvents , fetchUserByEmail  } from '../utils/api';

const Home = ({ searchTerm, selectedLocation }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const email = localStorage.getItem('email'); 
    const username = localStorage.getItem('username');
    // console.log('Email retrieved from local storage:', email);

    useEffect(() => {
        const getEvents = async () => {
            try {
                const data = await fetchEvents(); // Fetch all events
                console.log('Fetched events:', data); // Log the fetched events
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
                setError('Failed to load events'); // Handle error
            } finally {
                setLoading(false);
            }
        };
        const getUser = async () => {
            if (email) {
                try {
                    const userData = await fetchUserByEmail(email);
                    console.log('User data fetched:', userData); // Fetch user by email
                    // Set the username state
                } catch (error) {
                    console.error('Error fetching user:', error);
                    setError('Failed to load user data'); // Handle error
                }
            }
        };

        
        getEvents();
        
    }, []);

    const filteredEvents = events.filter(event => {
        const matchesSearchTerm = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                   event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const eventCity = event.location.split(',').pop().trim();
        const matchesLocation = selectedLocation ? eventCity.toLowerCase() === selectedLocation.toLowerCase() : true;
        return matchesSearchTerm && matchesLocation;
    });

    // Handler for previous and next
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? filteredEvents.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === filteredEvents.length - 1 ? 0 : prevIndex + 1));
    };

    // Inline styles for the component
    const styles = {
        container: {
            backgroundColor: '#f8f9fa',
            padding: '0px',
            maxWidth: '1320px',
            margin: '0 auto', // Center the container
        },
        carousel: {
            height: '350px',
        },
        carouselInner: {
            height: '100%',
        },
        image: {
            height: '350px',
            objectFit: 'cover',
        },
        card: {
            marginBottom: '1.9rem', // Spacing between cards
        },
        title: {
            fontSize: '1.25rem', // Card title font size
        },
        text: {
            fontSize: '1rem', // Card text font size
        },
    };

    return (
        <div style={styles.container}>
            {/* Display welcome message */}
          <h3> welcome {username}!!</h3>

            {/* Carousel Section */}
            <div id="eventCarousel" className="carousel slide" data-ride="carousel" style={styles.carousel}>
                <div className="carousel-inner" style={styles.carouselInner}>
                    {filteredEvents.length > 0 && filteredEvents.map((event, index) => (
                        <div className={`carousel-item ${index === currentIndex ? 'active' : ''}`} key={event.id}>
                            <img 
                                src={event.imageUrl}  // URL from the database
                                className="d-block w-100" 
                                alt={event.title} 
                                style={styles.image} // Inline image styles
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{event.title}</h5>
                                <p>{event.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Previous Control */}
                <a 
                    className="carousel-control-prev" 
                    onClick={handlePrev} // Change to use handlePrev function
                    role="button" 
                    data-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                {/* Next Control */}
                <a 
                    className="carousel-control-next" 
                    onClick={handleNext} // Change to use handleNext function
                    role="button" 
                    data-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>

            <h1 className="my-4">Upcoming Events</h1>

            {loading ? (
                <p>Loading events...</p>
            ) : error ? (
                <h3>{error}</h3> // Display any errors if occurred
            ) : filteredEvents.length === 0 ? (
                <p>No events found.</p>
            ) : (
                <div className="row">
                    {filteredEvents.map((event) => (
                        <div className="col-md-4" key={event.id}>
                            <div className="card" style={styles.card}>
                                <img src={event.imageUrl} className="card-img-top" alt={event.title} />
                                <div className="card-body">
                                    <h5 className="card-title" style={styles.title}>{event.title}</h5>
                                    <p className="card-text" style={styles.text}>{event.description}</p>
                                    <Link to={`/events/${event._id}`} className="">View Details</Link> {/* Link to event details */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
