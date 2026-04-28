import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const ModernTemplate = ({ data, colors }) => {
  return (
    <div className="template-card modern" style={{ '--primary-color': colors.primary, '--secondary-color': colors.secondary }}>
      <div className="modern-container">
        <div className="modern-left">
          <div className="modern-initials">
            {data.couple.bride?.charAt(0)}{data.couple.groom?.charAt(0)}
          </div>
        </div>
        <div className="modern-right">
          <h1 className="modern-title">{data.couple.bride} <span className="modern-amp">&</span> {data.couple.groom}</h1>
          <p className="modern-invite">invite you to celebrate their wedding</p>
          
          <div className="modern-details">
            <div><FaCalendarAlt /> {data.eventDate ? new Date(data.eventDate).toLocaleDateString() : 'Date TBA'}</div>
            <div><FaClock /> {data.eventTime || 'Time TBA'}</div>
            <div><FaMapMarkerAlt /> {data.venue?.name || 'Venue TBA'}</div>
          </div>
          
          <p className="modern-message">{data.description || 'Your presence would mean the world to us as we begin this beautiful journey.'}</p>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;