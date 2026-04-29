import React, { useState, useEffect } from 'react';
import { FaCrown, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaWhatsapp, FaVideo, FaCopy, FaShareAlt } from 'react-icons/fa';

const LuxuryTemplate = ({ data }) => {
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
    <div style={{ fontFamily: "'Playfair Display', serif", background: '#0a0a0f', color: '#d4af37' }}>
      <div style={{ background: `url(${couplePhoto}) center/cover`, height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative' }}>
        <div style={{ background: 'rgba(0,0,0,0.6)', padding: '3rem', borderRadius: '30px' }}>
          <FaCrown size={50} color="#FFD700" />
          <h1 style={{ fontSize: '4rem', margin: '0.5rem 0' }}>{groomName} & {brideName}</h1>
          <p style={{ fontSize: '1.2rem' }}>Request the honour of your presence</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
            {Object.entries(timeLeft).map(([unit, val]) => (<div key={unit} style={{ background: '#d4af37', color: '#0a0a0f', padding: '0.5rem 1rem', borderRadius: '10px' }}><div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{val}</div><div>{unit}</div></div>))}
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '3rem' }}><p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>{message}</p></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ background: 'rgba(255,215,0,0.1)', padding: '1.5rem', borderRadius: '20px', textAlign: 'center' }}><FaCalendarAlt size={40} color="#FFD700" /><h3>{weddingDate}</h3></div>
        <div style={{ background: 'rgba(255,215,0,0.1)', padding: '1.5rem', borderRadius: '20px', textAlign: 'center' }}><FaClock size={40} color="#FFD700" /><h3>{weddingTime}</h3></div>
        <div style={{ background: 'rgba(255,215,0,0.1)', padding: '1.5rem', borderRadius: '20px', textAlign: 'center' }}><FaMapMarkerAlt size={40} color="#FFD700" /><h3>{venue}</h3></div>
      </div>
      <div style={{ textAlign: 'center', margin: '2rem' }}><h2>Live Wedding</h2><iframe src={liveStreamLink} style={{ width: '90%', height: '450px', border: 'none', borderRadius: '20px' }} title="live"></iframe></div>
      <div style={{ textAlign: 'center', padding: '2rem' }}><h2>RSVP</h2><form action={rsvpLink} style={{ maxWidth: '400px', margin: '0 auto' }}><input type="text" placeholder="Your Name" style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', background: '#1a1a2e', border: '1px solid #d4af37', color: 'white', borderRadius: '10px' }} /><input type="email" placeholder="Email" style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', background: '#1a1a2e', border: '1px solid #d4af37', color: 'white', borderRadius: '10px' }} /><button type="submit" style={{ background: '#d4af37', color: '#0a0a0f', padding: '0.8rem 2rem', border: 'none', borderRadius: '40px', fontWeight: 'bold', cursor: 'pointer' }}>Confirm Attendance</button></form></div>
      <div style={{ textAlign: 'center', padding: '2rem' }}><a href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`} style={{ background: '#25D366', color: 'white', padding: '0.8rem 1.8rem', borderRadius: '40px', textDecoration: 'none', display: 'inline-block' }}><FaWhatsapp /> Send WhatsApp</a></div>
      <footer style={{ background: '#060608', textAlign: 'center', padding: '1.5rem', marginTop: '2rem', borderTop: '1px solid #d4af37' }}><p>© {groomName} & {brideName} | WedCard Pro</p></footer>
    </div>
  );
};

export const templateMeta = {
  name: 'Royal Maharaja',
  style: 'Luxury Heritage',
  price: 'Premium',
  rating: 5.0,
  category: 'luxury',
  image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400'
};

export default LuxuryTemplate;