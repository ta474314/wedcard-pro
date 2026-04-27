import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUmbrellaBeach } from 'react-icons/fa';

const BeachTemplate = ({ data, colors }) => {
  return (
    <div className="template-card beach" style={{ '--primary-color': colors.primary, '--secondary-color': colors.secondary }}>
      <div className="beach-container">
        <FaUmbrellaBeach className="beach-icon" />
        <h2 className="beach-subtitle">Save the Date</h2>
        <h1 className="beach-title">{data.couple.bride} & {data.couple.groom}</h1>
        <p className="beach-invite">are getting married</p>
        
        <div className="beach-details">
          <p><FaCalendarAlt /> {data.eventDate ? new Date(data.eventDate).toLocaleDateString() : 'Date TBA'}</p>
          <p><FaClock /> {data.eventTime || 'Time TBA'}</p>
          <p><FaMapMarkerAlt /> {data.venue?.name || 'Venue TBA'}</p>
        </div>
        
        <p className="beach-message">{data.description || 'Join us for a sunset ceremony by the ocean'}</p>
        <p className="beach-attire">Beach Formal Attire</p>
      </div>
    </div>
  );
};

export default BeachTemplate;