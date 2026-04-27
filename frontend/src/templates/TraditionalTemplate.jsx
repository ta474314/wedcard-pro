import React from 'react';
import { FaHeart, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaOm } from 'react-icons/fa';

const TraditionalTemplate = ({ data, colors }) => {
  return (
    <div className="template-card traditional" style={{ '--primary-color': colors.primary, '--secondary-color': colors.secondary }}>
      <div className="traditional-container">
        <FaOm className="traditional-om" />
        <div className="traditional-border">
          <h2 className="traditional-subtitle">शुभ विवाह</h2>
          <h1 className="traditional-title">{data.couple.bride} <FaHeart className="traditional-heart" /> {data.couple.groom}</h1>
          <p className="traditional-line">request the pleasure of your company</p>
          
          <div className="traditional-details">
            <p><FaCalendarAlt /> {data.eventDate ? new Date(data.eventDate).toLocaleDateString() : 'Date TBA'}</p>
            <p><FaClock /> {data.eventTime || 'Time TBA'}</p>
            <p><FaMapMarkerAlt /> {data.venue?.name || 'Venue TBA'}</p>
          </div>
          
          <p className="traditional-message">{data.description || 'Join us as we celebrate our union with family and friends.'}</p>
          
          <div className="traditional-footer">
            <p>Blessings and best wishes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraditionalTemplate;