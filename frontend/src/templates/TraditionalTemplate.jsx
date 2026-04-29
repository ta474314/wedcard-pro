import React from 'react';

const TraditionalTemplate = ({ data }) => {
  const { coupleNames, weddingDate, venue, message, ceremonyTime } = data;
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: '#fdf4e3', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', fontFamily: "'Times New Roman', serif", border: '1px solid #e2c8a2' }}>
      <div style={{ background: '#8b0000', padding: '1rem', textAlign: 'center', color: 'goldenrod' }}>
        <h2>शादी का निमंत्रण</h2>
      </div>
      <div style={{ padding: '1.5rem', textAlign: 'center' }}>
        <h3>{coupleNames}</h3>
        <p>{message}</p>
        <p><strong>मुहूर्त:</strong> {weddingDate}, {ceremonyTime}</p>
        <p><strong>स्थान:</strong> {venue}</p>
        <button style={{ background: '#8b0000', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '8px', cursor: 'pointer' }}>सादर आमंत्रण</button>
      </div>
    </div>
  );
};

export const templateMeta = {
  name: 'Divine Blessings',
  style: 'Spiritual',
  price: 'Premium',
  rating: 4.7,
  category: 'spiritual',
  image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400'
};

export default TraditionalTemplate;