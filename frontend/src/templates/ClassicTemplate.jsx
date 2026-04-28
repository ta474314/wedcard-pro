import React from 'react';
import { FaHeart, FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const ClassicTemplate = ({ data, colors }) => {
  return (
    <div className="template-card classic" style={{ '--primary-color': colors.primary, '--secondary-color': colors.secondary }}>
      <div className="template-border">
        <div className="template-header">
          <FaHeart className="template-icon" />
          <h2 className="template-tagline">Together with their families</h2>
        </div>
        
        <div className="template-content">
          <h1 className="template-title">{data.title || `${data.couple.bride} & ${data.couple.groom}`}</h1>
          <h3 className="template-subtitle">request the honor of your presence</h3>
          
          <div className="template-details">
            <div className="detail-item">
              <FaCalendarAlt />
              <span>{data.eventDate ? new Date(data.eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Date TBA'}</span>
            </div>
            <div className="detail-item">
              <FaClock />
              <span>{data.eventTime || 'Time TBA'}</span>
            </div>
            <div className="detail-item">
              <FaMapMarkerAlt />
              <span>{data.venue?.name || 'Venue TBA'}, {data.venue?.city || ''}</span>
            </div>
          </div>
          
          <p className="template-message">{data.description || 'Join us as we celebrate our love and begin our journey together.'}</p>
          
          <div className="template-footer">
            <p>Reception to follow</p>
            <p className="template-rsvp">RSVP by {data.rsvpDeadline || 'date TBA'}</p>
          </div>
        </div>
        
        <div className="template-border-bottom"></div>
      </div>
    </div>
  );
};

export default ClassicTemplate;