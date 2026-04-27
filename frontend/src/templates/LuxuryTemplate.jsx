import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaCrown } from 'react-icons/fa';

const LuxuryTemplate = ({ data, colors }) => {
  return (
    <div className="template-card luxury" style={{ '--primary-color': colors.primary, '--secondary-color': colors.secondary }}>
      <div className="luxury-container">
        <FaCrown className="luxury-crown" />
        <div className="luxury-border">
          <h2 className="luxury-subtitle">The Wedding of</h2>
          <h1 className="luxury-title">{data.couple.bride}<br/><span className="luxury-amp">&</span><br/>{data.couple.groom}</h1>
          
          <div className="luxury-details">
            <div className="luxury-detail">
              <FaCalendarAlt />
              <span>{data.eventDate ? new Date(data.eventDate).toLocaleDateString() : 'Date TBA'}</span>
            </div>
            <div className="luxury-detail">
              <FaClock />
              <span>{data.eventTime || 'Time TBA'}</span>
            </div>
            <div className="luxury-detail">
              <FaMapMarkerAlt />
              <span>{data.venue?.name || 'Venue TBA'}</span>
            </div>
          </div>
          
          <p className="luxury-message">{data.description || 'The honor of your presence is requested'}</p>
          
          <div className="luxury-footer">
            <p>Black Tie Optional</p>
            <p>Reception to follow</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxuryTemplate;