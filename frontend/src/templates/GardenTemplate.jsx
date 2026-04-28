import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaLeaf } from 'react-icons/fa';

const GardenTemplate = ({ data, colors }) => {
  return (
    <div className="template-card garden" style={{ '--primary-color': colors.primary, '--secondary-color': colors.secondary }}>
      <div className="garden-container">
        <FaLeaf className="garden-leaf" />
        <h2 className="garden-subtitle">You are cordially invited</h2>
        <h1 className="garden-title">{data.couple.bride} <span className="garden-amp">&</span> {data.couple.groom}</h1>
        
        <div className="garden-details">
          <p><FaCalendarAlt /> {data.eventDate ? new Date(data.eventDate).toLocaleDateString() : 'Date TBA'}</p>
          <p><FaClock /> {data.eventTime || 'Time TBA'}</p>
          <p><FaMapMarkerAlt /> {data.venue?.name || 'Venue TBA'}</p>
        </div>
        
        <p className="garden-message">{data.description || 'Please join us for a garden ceremony and reception'}</p>
        <p className="garden-rsvp">Kindly RSVP by {data.rsvpDeadline || 'date TBA'}</p>
      </div>
    </div>
  );
};

export default GardenTemplate;