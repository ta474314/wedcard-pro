import React, { useState, useEffect } from 'react';
import { FaUmbrellaBeach, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaWhatsapp, FaVideo, FaShareAlt, FaCamera } from 'react-icons/fa';

const BeachTemplate = ({ data }) => {
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
    <div style={{ fontFamily: "'Quicksand', sans-serif", background: '#e6f7ff', color: '#005f73' }}>
      <div style={{ background: `url(${couplePhoto}) center/cover`, height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '2rem', borderRadius: '50px' }}>
          <FaUmbrellaBeach size={60} color="#FFD700" />
          <h1 style={{ fontSize: '3rem' }}>{groomName} & {brideName}</h1>
          <p>Destination Beach Wedding</p>
        </div>
      </div>
      <div style={{ padding: '2rem', textAlign: 'center' }}><p>{message}</p><div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>{Object.entries(timeLeft).map(([unit, val]) => (<div key={unit} style={{ background: '#0097b2', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px' }}><div style={{ fontSize: '1.5rem' }}>{val}</div><div>{unit}</div></div>))}</div></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '20px', textAlign: 'center' }}><FaCalendarAlt /><h3>{weddingDate}</h3></div>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '20px', textAlign: 'center' }}><FaClock /><h3>{weddingTime}</h3></div>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '20px', textAlign: 'center' }}><FaMapMarkerAlt /><h3>{venue}</h3></div>
      </div>
      <div style={{ textAlign: 'center' }}><h2>Live from the Beach</h2><iframe src={liveStreamLink} style={{ width: '90%', height: '400px', border: 'none', borderRadius: '30px' }}></iframe></div>
      <div style={{ padding: '2rem', textAlign: 'center' }}><h2>RSVP</h2><form action={rsvpLink} style={{ maxWidth: '400px', margin: '0 auto' }}><input type="text" placeholder="Name" style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '40px', border: '1px solid #0097b2' }} /><input type="email" placeholder="Email" style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '40px', border: '1px solid #0097b2' }} /><button type="submit" style={{ background: '#0097b2', color: 'white', padding: '0.8rem 2rem', borderRadius: '40px', border: 'none' }}>RSVP</button></form></div>
      <div style={{ textAlign: 'center', padding: '1rem' }}><a href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`} style={{ background: '#25D366', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '40px', textDecoration: 'none', display: 'inline-block' }}><FaWhatsapp /> WhatsApp</a></div>
      <footer style={{ background: '#005f73', color: '#e6f7ff', textAlign: 'center', padding: '1rem', marginTop: '2rem' }}><p>© Beach Wedding | WedCard Pro</p></footer>
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