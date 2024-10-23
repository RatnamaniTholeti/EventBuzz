// src/components/EventForm.js
import React, { useState, useEffect } from 'react';

const EventForm = ({ onSubmit, existingEvent, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        dateTime: '',
        description: '',
        imageUrl: '',
        price: 0,
        availableTickets: 0,
    });

    useEffect(() => {
        if (existingEvent) {
            setFormData(existingEvent);
        }
    }, [existingEvent]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ title: '', location: '', dateTime: '', description: '', imageUrl: '', price: 0, availableTickets: 0 });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input 
                    type="text" 
                    name="title" 
                    className="form-control" 
                    value={formData.title} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Location</label>
                <input 
                    type="text" 
                    name="location" 
                    className="form-control" 
                    value={formData.location} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Date & Time</label>
                <input 
                    type="datetime-local" 
                    name="dateTime" 
                    className="form-control" 
                    value={formData.dateTime} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea 
                    name="description" 
                    className="form-control" 
                    value={formData.description} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input 
                    type="url" 
                    name="imageUrl" 
                    className="form-control" 
                    value={formData.imageUrl} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Price</label>
                <input 
                    type="number" 
                    name="price" 
                    className="form-control" 
                    value={formData.price} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Available Tickets</label>
                <input 
                    type="number" 
                    name="availableTickets" 
                    className="form-control" 
                    value={formData.availableTickets} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <button type="submit" className="btn btn-primary">
                {existingEvent ? 'Update Event' : 'Create Event'}
            </button>
            {existingEvent && (
                <button type="button" className="btn btn-secondary" onClick={onCancel} style={{ marginLeft: '10px' }}>
                    Cancel
                </button>
            )}
        </form>
    );
};

export default EventForm;
