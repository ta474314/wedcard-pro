import React from 'react';

const BeachTemplate = ({ data }) => {
  const { coupleNames, weddingDate, venue, message, ceremonyTime } = data;
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: '#e6f7ff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', fontFamily: "'Quicksand', sans-serif" }}>
      <div style={{ background: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600") center/cover', height: '180px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '1rem' }}>
        <h2 style={{ background: 'rgba(0,0,0,0.6)', color: 'white', padding: '0.3rem 1rem', borderRadius: '30px' }}>Destination Wedding</h2>
      </div>
      <div style={{ padding: '1.5rem', textAlign: 'center' }}>
        <h3>{coupleNames}</h3>
        <p>{message}</p>
        <p>🏖️ {venue}</p>
        <p>📅 {weddingDate} at {ceremonyTime}</p>
        <button style={{ background: '#0097b2', color: 'white', border: 'none', padding: '0.75rem 2rem', borderRadius: '40px', cursor: 'pointer' }}>RSVP for Beach Wedding</button>
      </div>
    </div>
  );
};

export const templateMeta = {
  name: 'Beach Paradise',
  style: 'Destination',
  price: 'Free',
  rating: 4.8,
  category: 'destination',
  image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400'
};

export default BeachTemplate;