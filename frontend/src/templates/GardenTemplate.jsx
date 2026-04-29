import React, { useState, useEffect } from 'react';
import { FaLeaf, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaWhatsapp, FaVideo, FaShareAlt, FaFlask } from 'react-icons/fa';

const GardenTemplate = ({ data }) => {
  const { groomName, brideName, weddingDate, weddingTime, venue, message, rsvpLink, whatsappNumber, liveStreamLink, galleryImages, qrCodeUrl, couplePhoto } = data;
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const target = new Date(weddingDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff < 0) return;
      setTimeLeft({ days: Math.floor(diff / (1000*60*60*24)), hours: Math.floor((diff % (86400000)) / (1000*60*60)), minutes: Math.floor((diff % (3600000)) / (1000*60)), seconds: Math.floor((diff % (60000)) / 1000) });
    }, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: '#f0f7e8', color: '#2d5a27' }}>
      <div style={{ background: `url(${couplePhoto}) center/cover`, height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ background: 'rgba(255,255,255,0.8)', padding: '2rem', borderRadius: '30px', color: '#5a7d3c' }}>
          <FaLeaf size={50} /><h1>{groomName} & {brideName}</h1><p>Garden Wedding</p>
        </div>
      </div>
      <div style={{ padding: '2rem', textAlign: 'center' }}><p>{message}</p><div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>{Object.entries(timeLeft).map(([unit, val]) => (<div key={unit} style={{ background: '#5a7d3c', color: 'white', padding: '0.5rem 1rem', borderRadius: '30px', minWidth: '70px' }}><div style={{ fontSize: '1.2rem' }}>{val}</div><div>{unit}</div></div>))}</div></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '25px', textAlign: 'center', boxShadow: '0 5px 10px rgba(0,0,0,0.05)' }}><FaCalendarAlt /><h3>{weddingDate}</h3></div>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '25px', textAlign: 'center', boxShadow: '0 5px 10px rgba(0,0,0,0.05)' }}><FaClock /><h3>{weddingTime}</h3></div>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '25px', textAlign: 'center', boxShadow: '0 5px 10px rgba(0,0,0,0.05)' }}><FaMapMarkerAlt /><h3>{venue}</h3></div>
      </div>
      <div style={{ textAlign: 'center' }}><h2>Live from the Garden</h2><iframe src={liveStreamLink} style={{ width: '90%', height: '400px', border: 'none', borderRadius: '30px' }}></iframe></div>
      <div style={{ padding: '2rem', textAlign: 'center' }}><h2>RSVP</h2><form action={rsvpLink} style={{ maxWidth: '400px', margin: '0 auto' }}><input type="text" placeholder="Your Name" style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '40px', border: '1px solid #5a7d3c' }} /><input type="email" placeholder="Email" style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '40px', border: '1px solid #5a7d3c' }} /><button type="submit" style={{ background: '#5a7d3c', color: 'white', padding: '0.8rem 2rem', borderRadius: '40px', border: 'none' }}>I Will Attend</button></form></div>
      <div style={{ textAlign: 'center', padding: '1rem' }}><a href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`} style={{ background: '#25D366', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '40px', textDecoration: 'none' }}><FaWhatsapp /> Message on WhatsApp</a></div>
      <footer style={{ background: '#5a7d3c', color: 'white', textAlign: 'center', padding: '1rem' }}><p>🌸 {groomName} & {brideName} | Garden Wedding 🌸</p></footer>
    </div>
  );
};

export const templateMeta = {
  name: 'Garden Elegance',
  style: 'Floral',
  price: 'Premium',
  rating: 4.9,
  category: 'floral',
  image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400'
};

export default GardenTemplate;