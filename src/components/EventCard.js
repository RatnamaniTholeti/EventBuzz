// EventCard.js
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const EventCard = ({ event }) => {
    return (
        <div className="col-md-4 mb-4">
            <Link 
                to={`/events/${event.id}`} 
                className="card border-0 shadow-sm" 
                style={{ height: '500px', width: '250px', overflow: 'hidden', textDecoration: 'none', color: 'inherit' }} // Make the card a link
            >
                <img 
                    src={event.imageUrl} 
                    className="card-img-top" 
                    alt={event.title} 
                    style={{ height: '300px', objectFit: 'cover' }} // Adjust height to keep uniformity
                />
                <div className="card-body" style={{ height: '100px' }}> {/* Set height for the body */}
                    <h5 className="card-title" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                        {event.title}
                    </h5>
                    <p className="card-text text-muted" style={{ margin: '0' }}>
                        {new Date(event.dateTime).toLocaleString()}
                    </p>
                    <p className="card-text text-muted" style={{ margin: '0' }}>
                        {event.location}
                    </p>
                    <p className="card-text font-weight-bold" style={{ margin: '0' }}>
                        ₹{event.price}
                    </p>
                </div>
            </Link>
        </div>
    );
};

EventCard.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        dateTime: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
};

export default EventCard;
