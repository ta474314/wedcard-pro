import React from 'react';

const ClassicTemplate = ({ data }) => {
  const { coupleNames, weddingDate, venue, message, ceremonyTime } = data;
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: '#fff8f0', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontFamily: "'Georgia', serif" }}>
      <div style={{ background: 'linear-gradient(135deg, #b8860b, #daa520)', padding: '2rem', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>{coupleNames}</h1>
        <p style={{ fontStyle: 'italic', marginTop: '0.5rem' }}>Request the honour of your presence</p>
      </div>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>{message}</p>
        <p><strong>Date:</strong> {weddingDate}</p>
        <p><strong>Venue:</strong> {venue}</p>
        <p><strong>Ceremony:</strong> {ceremonyTime}</p>
        <button style={{ background: '#b8860b', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '40px', marginTop: '1rem', cursor: 'pointer' }}>RSVP Now</button>
      </div>
    </div>
  );
};

export const templateMeta = {
  name: 'Golden Era',
  style: 'Vintage Luxury',
  price: 'Premium',
  rating: 4.9,
  category: 'vintage',
  image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400'
};

export default ClassicTemplate;