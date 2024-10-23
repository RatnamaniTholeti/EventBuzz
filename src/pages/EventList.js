// src/components/EventList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../utils/api';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getEvents = async () => {
            try {
                setLoading(true);
                const data = await fetchEvents();
                setEvents(data);
            } catch (err) {
                setError('Failed to fetch events');
            } finally {
                setLoading(false);
            }
        };

        getEvents();
    }, []);

    if (loading) {
        return <p>Loading events...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container">
            <h1 className="my-4">Upcoming Events</h1>
            <div className="row">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div key={event._id} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={event.imageUrl} className="card-img-top" alt={event.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{event.title}</h5>
                                    <p><strong>Date:</strong> {new Date(event.dateTime).toLocaleDateString()}</p>
                                    <p><strong>Location:</strong> {event.location}</p>
                                    <Link to={`/events/${event._id}`} className="btn btn-primary">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No events available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default EventList;
