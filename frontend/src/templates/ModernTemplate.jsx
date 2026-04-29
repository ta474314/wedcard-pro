import React from 'react';

const ModernTemplate = ({ data }) => {
  const { coupleNames, weddingDate, venue, message, ceremonyTime } = data;
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: '#fafafa', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ background: '#2c3e50', padding: '1.5rem', textAlign: 'center', color: 'white' }}>
        <h2 style={{ margin: 0, fontWeight: 600 }}>WE'RE GETTING MARRIED</h2>
      </div>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.8rem', color: '#e67e22' }}>{coupleNames}</h3>
        <p style={{ color: '#7f8c8d' }}>{message}</p>
        <div style={{ margin: '1.5rem 0' }}>
          <p>📅 {weddingDate}</p>
          <p>📍 {venue}</p>
          <p>⏰ {ceremonyTime}</p>
        </div>
        <button style={{ background: '#e67e22', border: 'none', padding: '0.75rem 2rem', borderRadius: '50px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Confirm Attendance</button>
      </div>
    </div>
  );
};

export const templateMeta = {
  name: 'Modern Romance',
  style: 'Contemporary',
  price: 'Free',
  rating: 4.8,
  category: 'modern',
  image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400'
};

export default ModernTemplate;