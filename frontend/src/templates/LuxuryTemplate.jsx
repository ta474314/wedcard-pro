import React from 'react';

const LuxuryTemplate = ({ data }) => {
  const { coupleNames, weddingDate, venue, message, ceremonyTime } = data;
  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      background: '#fef7e0',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 25px 45px rgba(0,0,0,0.2)',
      fontFamily: "'Playfair Display', serif"
    }}>
      <div style={{
        background: 'url("https://images.unsplash.com/photo-1519741497674-611481863552?w=600") center/cover',
        height: '200px',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 style={{ color: 'gold', fontSize: '2rem', textShadow: '2px 2px 4px black' }}>{coupleNames}</h1>
        </div>
      </div>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '1.1rem' }}>{message}</p>
        <div style={{ borderTop: '1px solid #d4af37', borderBottom: '1px solid #d4af37', padding: '1rem 0', margin: '1rem 0' }}>
          <p>📅 {weddingDate}</p>
          <p>📍 {venue}</p>
          <p>⏰ {ceremonyTime}</p>
        </div>
        <button style={{
          background: '#b8860b',
          color: 'white',
          border: 'none',
          padding: '0.8rem 1.8rem',
          borderRadius: '30px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>Join Celebration</button>
      </div>
    </div>
  );
};

export default LuxuryTemplate;