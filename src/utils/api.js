// src/api.js
import axios from 'axios';

const API_URL = 'https://event-buzz-server-psi.vercel.app/api'; // Change this if your backend is hosted elsewhere

// Auth API
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error; // Propagate the error to handle it where this function is called
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data; // Make sure to return the response data
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // Propagate the error to handle it where this function is called
    }
};

export const fetchUserByEmail = async (email) => {
    try {
        const response = await axios.get(`${API_URL}/auth/user/${email}`);
        return response.data; // Return user data
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error; // Propagate the error to handle it where this function is called
    }
};

// Event API
export const fetchEvents = async () => {
    try {
        const response = await axios.get(`${API_URL}/events`);
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error; // Propagate the error to handle it where this function is called
    }
};

export const fetchEventById = async (eventId) => {
    try {
        const response = await axios.get(`${API_URL}/events/${eventId}`);
        return response.data; // Return the event data
    } catch (error) {
        console.error('Error fetching event by ID:', error);
        throw error; // Propagate the error to handle it where this function is called
    }
};

export const createEvent = async (eventData) => {
    try {
        const response = await axios.post(`${API_URL}/events`, eventData);
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error; // Propagate the error to handle it where this function is called
    }
};

export const updateEvent = async (eventId, eventData) => {
    try {
        const response = await axios.put(`${API_URL}/events/${eventId}`, eventData);
        return response.data; // Return the updated event data
    } catch (error) {
        console.error('Error updating event:', error);
        throw error; // Propagate the error to handle it where this function is called
    }
};

export const deleteEvent = async (eventId) => {
    try {
        const response = await axios.delete(`${API_URL}/events/${eventId}`);
        return response.data; // Return the response to indicate success
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error; // Propagate the error to handle it where this function is called
    }
};

// Booking API
export const createBooking = async (bookingData) => {
    try {
        const response = await axios.post(`${API_URL}/bookings`, bookingData);
        return response.data; // Return the booking data
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error; // Propagate the error to handle it where this function is called
    }
};

// Fetch bookings
export const fetchBookings = async () => {
    try {
        const response = await axios.get(`${API_URL}/bookings`); // Fetch all bookings
        return response.data;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error; // Propagate the error to handle it where this function is called
    }
};

// Fetch bookings for a specific user
export const fetchUserBookings = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/bookings/${userId}`); // Fetch bookings by user ID
        return response.data;
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        throw error; // Propagate the error to handle it where this function is called
    }
};

export const updateBookingStatus = async (id, bookingStatus) => {
    try {
        const response = await axios.patch(`${API_URL}/bookings/${id}`, { bookingStatus });
        return response.data;
    } catch (error) {
        console.error('Error updating booking status:', error);
        throw error; // Propagate the error to handle it where this function is called
    }
};
