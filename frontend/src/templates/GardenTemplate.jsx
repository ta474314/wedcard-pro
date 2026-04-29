import React from 'react';

const GardenTemplate = ({ data }) => {
  const { coupleNames, weddingDate, venue, message, ceremonyTime } = data;
  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      background: '#f0f7e8',
      borderRadius: '28px',
      overflow: 'hidden',
      boxShadow: '0 12px 28px rgba(0,0,0,0.1)',
      fontFamily: "'Nunito', sans-serif",
      border: '1px solid #b0c47a'
    }}>
      <div style={{ background: '#5a7d3c', padding: '1rem', textAlign: 'center', color: 'white' }}>
        <h3>Garden Wedding</h3>
      </div>
      <div style={{ padding: '1.8rem', textAlign: 'center' }}>
        <h2>{coupleNames}</h2>
        <p>🌸 {message} 🌸</p>
        <p>🗓️ {weddingDate}</p>
        <p>📍 {venue}</p>
        <p>⏰ {ceremonyTime}</p>
        <button style={{
          background: '#5a7d3c',
          color: 'white',
          border: 'none',
          padding: '0.6rem 1.5rem',
          borderRadius: '50px',
          cursor: 'pointer'
        }}>Coming with Joy</button>
      </div>
    </div>
  );
};

export default GardenTemplate;