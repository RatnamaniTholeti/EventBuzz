// src/components/SeatSelection.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const SeatSelection = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate here
    const { event } = location.state || {};
    const totalSeats = event?.availableTickets || 0; // Total seats available from event data
    const [selectedSeats, setSelectedSeats] = useState([]); // State for selected seats
    const [numberOfTickets, setNumberOfTickets] = useState(1); // Default number of tickets
    const [ticketPrice, setTicketPrice] = useState(event?.price || 0); // Ticket price from event data
    const [totalPrice, setTotalPrice] = useState(ticketPrice); // Total price calculated
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null); // State for selected time slot

    // Effect to update the total price based on tickets selected
    useEffect(() => {
        setTotalPrice(ticketPrice * numberOfTickets);
    }, [numberOfTickets, ticketPrice]);

    // Effect to adjust selected seats when the number of tickets changes
    useEffect(() => {
        // If selected seats exceed the number of tickets, trim the selected seats
        if (selectedSeats.length > numberOfTickets) {
            setSelectedSeats(selectedSeats.slice(0, numberOfTickets));
        }
    }, [numberOfTickets]);

    // Function to render seat buttons
    const renderSeats = () => {
        const seats = [];
        for (let i = 1; i <= totalSeats; i++) {
            const seatNumber = `${i}`; // Seat number
            const isSelected = selectedSeats.includes(seatNumber); // Check if the seat is selected
            seats.push(
                <button
                    key={seatNumber}
                    className={`seat ${isSelected ? 'selected' : ''}`} // Add selected class if seat is selected
                    onClick={() => handleSeatClick(seatNumber)} // Handle seat click
                    style={{
                        height: '40px',
                        width: '40px',
                        margin: '5px',
                        padding: '10px 10px',
                        backgroundColor: isSelected ? '#28a745' : '#add8e6', // Light blue for unselected seats
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }}
                >
                    {seatNumber}
                </button>
            );
        }
        return seats;
    };

    // Function to handle seat selection
    const handleSeatClick = (seatNumber) => {
        // Limit selection to the number of tickets
        if (selectedSeats.includes(seatNumber)) {
            // If the seat is already selected, remove it
            setSelectedSeats(prevSelectedSeats => prevSelectedSeats.filter(seat => seat !== seatNumber));
        } else {
            // If the seat is not selected, check if the limit is reached
            if (selectedSeats.length < numberOfTickets) {
                setSelectedSeats(prevSelectedSeats => [...prevSelectedSeats, seatNumber]); // Add seat to selection
            } else {
                alert(`You can only select up to ${numberOfTickets} seats.`); // Alert if limit is reached
            }
        }
    };

    // Function to confirm seat selection
    const confirmSelection = () => {
        if (selectedSeats.length === numberOfTickets && selectedTimeSlot) {
            // Navigate to Booking Confirmation page with selected data
            navigate('/booking-confirmation', {
                state: {
                    event,
                    selectedSeats,
                    numberOfTickets,
                    totalPrice,
                    selectedTimeSlot,
                },
            });
        } else {
            alert(`Please select exactly ${numberOfTickets} seats and a time slot.`);
        }
    };

    // Function to render time slot buttons
    const renderTimeSlots = () => {
        if (!event?.timeSlots || event.timeSlots.length === 0) {
            return <p>No time slots available.</p>;
        }
        return event.timeSlots.map((slot, index) => (
            <button
                key={index}
                className={`time-slot ${selectedTimeSlot === slot ? 'selected' : ''}`} // Add selected class if time slot is selected
                onClick={() => setSelectedTimeSlot(slot)} // Handle time slot selection
                style={{
                    margin: '10px',
                    padding: '1px 20px',
                    backgroundColor: selectedTimeSlot === slot ? '#32a852' : '#ffbd44', // Green when selected, yellow otherwise
                    color: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'background-color 0.3s',
                }}
            >
                {slot}
            </button>
        ));
    };

    return (
        <div className="container">
            <h3 className="my-4">Select Your Seats for <span style={{ color: 'burlywood' }}>{event?.title}</span> :</h3>
            <h6 style={{ color: 'green' }}>
                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '5px' }} /> {event?.location}
            </h6>
            <h6>Select a Time Slot:</h6>
            <div className="time-slots-container" style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
                {renderTimeSlots()}

                <h6 style={{ marginLeft: '180px', marginTop: '15px' }}>Number of Tickets:</h6>
                <select
                    value={numberOfTickets}
                    onChange={(e) => setNumberOfTickets(Number(e.target.value))}
                    className="form-select my-2 ticket-dropdown"
                    style={{
                        width: '140px',
                        padding: '7px',
                        fontSize: '14px',
                        borderRadius: '8px',
                        margin: '10px',
                        border: '2px solid #ccc',
                    }}
                >
                    {/* Generate options for tickets based on total available seats */}
                    {Array.from({ length: totalSeats }, (_, index) => index + 1).map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
            </div>
            <h3>Select Your Seats:</h3>
            <div className="seats-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {renderSeats()}
            </div>

            <div className="my-4">
                <h3>Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</h3>
            </div>

            <button
                className="btn btn-primary"
                onClick={confirmSelection}
                style={{
                    padding: '12px 160px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: '#ff5733', // Bright red-orange color
                    color: '#fff',
                    fontSize: '18px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s, transform 0.2s',
                    marginTop: '15px',
                    marginLeft: '380px'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e04e2f')} // Darker shade on hover
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ff5733')} // Reset color on mouse leave
                onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')} // Slightly shrink on click
                onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')} // Reset scale after click
            >
                Pay Rs. {totalPrice}
            </button>
        </div>
    );
};

export default SeatSelection;
