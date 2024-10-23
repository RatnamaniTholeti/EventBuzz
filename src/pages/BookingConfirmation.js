// src/pages/BookingConfirmation.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import Axios
import { toast } from 'react-toastify'; // Import toast for notifications

const username = localStorage.getItem('username');
const userid = localStorage.getItem('userid');
const token = localStorage.getItem('token'); // Assuming you stored the JWT token in localStorage

const BookingConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { event, selectedSeats, numberOfTickets, totalPrice, selectedTimeSlot } = location.state || {};

    if (!event) {
        return <h1>No booking information found!</h1>;
    }

    // Function to handle booking tickets
    const handleBooking = async () => {
        try {
            const response = await axios.post('https://event-buzz-server-psi-psi.vercel.app/api/bookings', {
                userId: userid,
                eventId: event._id, // Ensure you're passing the correct event ID
                seats: selectedSeats,
                paymentStatus: 'Confirmed', // Set to 'Confirmed' initially
                bookingStatus: 'Confirmed',  // Set to 'Confirmed' initially
                bookingTime: new Date(),     // Current exact time
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in headers
                }
            });
            toast.success('Booking successful!'); // Show success notification
            navigate('/home');
            alert(`the userid:${userid} ,
                 eventId: ${event._id},
                seats: ${selectedSeats},
                paymentStatus: 'Confirmed', 
                bookingStatus: 'Confirmed',  
                   `); 
        } catch (error) {
            console.error('Error booking tickets:', error);
            toast.error('Error booking tickets. Please try again.'); // Show error notification
        }
    };

    return (
        <div className="container">
            <h1 className="my-4">Booking Confirmation</h1>
            <div className="card d-flex flex-row"> {/* Use Flexbox for side-by-side layout */}
                <div className="card-image" style={{ flex: 1, width: '400px', height: '500px' }}> {/* Restrict image width */}
                    <img src={event.imageUrl} className="img-fluid" alt={event.title} style={{ width: '800px', height: '480px', borderRadius: '8px', margin: '10px' }} />
                </div>
                <div className="card-body" style={{ flex: 2, marginLeft: '10px', lineHeight: '40px' }}> {/* Flex to take more space */}
                    <h2 className="card-title">{event.title}</h2>
                    <p className="card-text">{event.description}</p>
                    <p>
                        <strong>Username:</strong> {username}<br />
                        <strong>UserID:</strong> {userid}<br />
                        <strong>Date & Time:</strong> {new Date(event.dateTime).toLocaleString()}<br />
                        <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '5px' }} />
                        <strong>Location:</strong> {event.location}<br />
                        <strong>Number of Tickets:</strong> {numberOfTickets}<br />
                        <strong>Selected Seats:</strong> {selectedSeats.join(', ')}<br />
                        <strong>Time Slot:</strong> {selectedTimeSlot}<br />
                        <strong>Total Price:</strong> ₹{totalPrice}
                    </p>
                      <button
                className="btn btn-primary mt-4"
                onClick={handleBooking} // Trigger booking on click
                style={{
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    marginLeft: '550px'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
            >
                Book Tickets
            </button>
          
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmation;
