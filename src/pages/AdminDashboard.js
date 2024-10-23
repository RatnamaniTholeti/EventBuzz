import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar1 from '../components/Navbar1';

import {
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    fetchBookings,
    fetchUserBookings,
    updateBookingStatus
} from '../utils/api';
import EventForm from '../components/EventForm';

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [editEvent, setEditEvent] = useState(null);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [loadingBookings, setLoadingBookings] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [userId, setUserId] = useState('');
    const [showAllBookings, setShowAllBookings] = useState(false); // New state variable

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await fetchEvents();
                setEvents(data);
            } catch (error) {
                console.error('Failed to load events:', error);
            } finally {
                setLoadingEvents(false);
            }
        };

        const loadBookings = async () => {
            setLoadingBookings(true);
            try {
                const data = await fetchBookings();
                setBookings(data);
            } catch (error) {
                console.error('Failed to load bookings:', error);
            } finally {
                setLoadingBookings(false);
            }
        };

        loadEvents();
        loadBookings();
    }, []);

    const handleFetchUserBookings = async () => {
        setLoadingBookings(true);
        try {
            const data = await fetchUserBookings(userId);
            setBookings(data);
        } catch (error) {
            console.error('Failed to load user bookings:', error);
        } finally {
            setLoadingBookings(false);
        }
    };

    const handleCreateEvent = async (event) => {
        const newEvent = await createEvent(event);
        setEvents((prev) => [...prev, newEvent]);
        setShowForm(false);
    };

    const handleUpdateEvent = async (event) => {
        const updatedEvent = await updateEvent(event._id, event);
        setEvents((prev) =>
            prev.map((e) => (e._id === updatedEvent._id ? updatedEvent : e))
        );
        setEditEvent(null);
        setShowForm(false);
    };

    const handleDeleteEvent = async (id) => {
        await deleteEvent(id);
        setEvents((prev) => prev.filter((e) => e._id !== id));
    };

    const handleUpdateBookingStatus = async (bookingId, newStatus) => {
        const updatedBooking = await updateBookingStatus(bookingId, newStatus);
        setBookings((prev) =>
            prev.map((booking) => (booking._id === updatedBooking.booking._id ? updatedBooking.booking : booking))
        );
    };

    return (
        <div className="container mt-5">
            <Navbar1 /> {/* Include Navbar1 here */}

            <Link to="/admin" className="btn btn-primary mb-3">Go to Home</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <button 
                className="btn btn-success mb-3" 
                onClick={() => setShowForm(true)} 
            >
                Create Event
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button 
                className="btn btn-info mb-3 ms-2" 
                onClick={() => setShowAllBookings(!showAllBookings)} 
            >
                {showAllBookings ? 'Hide All Bookings' : 'Show All Bookings'}
            </button>   
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <Link to="/" className="btn btn-primary mb-3">Logout</Link>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}


            <span className="text-center mb-4" style={{fontSize:'50px'}}><b>Admin Dashboard</b></span>
          
            {showAllBookings && (  // Conditional rendering for all bookings
                <>
                    <h2 className="mt-4">All Bookings</h2>
                    <div>
                        {loadingBookings ? (
                            <div className="alert alert-info" role="alert">Loading all bookings...</div>
                        ) : (
                            <>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>User ID</th>
                                            <th>Event Title</th>
                                            <th>Seats</th>
                                            <th>Payment Status</th>
                                            <th>Booking Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((booking) => (
                                            <tr key={booking._id}>
                                                <td>{booking.userId?.username || booking.userId}</td>
                                                <td>{booking.eventId?.title}</td>
                                                <td>{booking.seats.join(', ')}</td>
                                                <td>{booking.paymentStatus}</td>
                                                <td>{booking.bookingStatus}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                </>
            )}

            {loadingEvents ? (
                <div className="alert alert-info" role="alert">Loading events...</div>
            ) : (
                <>
                    {showForm ? (
                        <EventForm 
                            onSubmit={editEvent ? handleUpdateEvent : handleCreateEvent} 
                            existingEvent={editEvent} 
                            onCancel={() => { 
                                setEditEvent(null); 
                                setShowForm(false); 
                            }} 
                        />
                    ) : (
                        <>
                            <h2 className="mt-4">Manage Events</h2>
                            <div className="row">
                                {events.map((event) => (
                                    <div className="col-md-4 mb-4" key={event._id}>
                                        <div className="card">
                                            <img src={event.imageUrl} className="card-img-top" alt={event.title} />
                                            <div className="card-body">
                                                <h5 className="card-title">{event.title}</h5>
                                                <p className="card-text">{event.description}</p>
                                                <p className="card-text"><small className="text-muted">{new Date(event.dateTime).toLocaleString()}</small></p>
                                                <button 
                                                    className="btn btn-warning me-2" 
                                                    onClick={() => {
                                                        setEditEvent(event);
                                                        setShowForm(true);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    className="btn btn-danger" 
                                                    onClick={() => handleDeleteEvent(event._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
            
            <h2 className="mt-4">Fetch User Bookings</h2>
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter User ID" 
                    value={userId} 
                    onChange={(e) => setUserId(e.target.value)} 
                />
                <button 
                    className="btn btn-primary mt-2" 
                    onClick={handleFetchUserBookings}
                >
                    Fetch Bookings
                </button>
            </div>

            {loadingBookings ? (
                <div className="alert alert-info" role="alert">Loading bookings...</div>
            ) : (
                <>
                    <h2 className="mt-4">Manage User Bookings</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Event Title</th>
                                <th>Seats</th>
                                <th>Payment Status</th>
                                <th>Booking Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td>{booking.userId?.username || booking.userId}</td>
                                    <td>{booking.eventId?.title}</td>
                                    <td>{booking.seats.join(', ')}</td>
                                    <td>{booking.paymentStatus}</td>
                                    <td>
                                        <select 
                                            value={booking.bookingStatus} 
                                            onChange={(e) => handleUpdateBookingStatus(booking._id, e.target.value)}
                                            className="form-select"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                        </select>
                                    </td>
                                    <td>
                                        {/* Additional actions can be added here */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

         
        </div>
    );
};

export default AdminDashboard;
