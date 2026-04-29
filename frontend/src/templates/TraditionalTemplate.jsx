import React, { useState, useEffect } from 'react';
import { FaOm, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaWhatsapp, FaVideo, FaShareAlt, FaHeart } from 'react-icons/fa';

const TraditionalTemplate = ({ data }) => {
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
    <div style={{ fontFamily: "'Times New Roman', serif", background: '#fff5e6', color: '#8b0000', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ background: `url(${couplePhoto}) center/cover`, height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ background: 'rgba(139,0,0,0.7)', padding: '2rem', borderRadius: '20px', textAlign: 'center', color: '#ffd700' }}>
          <FaOm size={50} /><h1 style={{ fontSize: '2.5rem' }}>{groomName} & {brideName}</h1><p>विवाह निमंत्रण</p>
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '2rem' }}><p style={{ fontSize: '1.2rem' }}>{message}</p></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', padding: '2rem' }}>
        <div style={{ background: '#fdf4e3', padding: '1rem', borderRadius: '15px', textAlign: 'center' }}><FaCalendarAlt size={30} /><h3>तिथि</h3><p>{weddingDate}</p></div>
        <div style={{ background: '#fdf4e3', padding: '1rem', borderRadius: '15px', textAlign: 'center' }}><FaClock size={30} /><h3>समय</h3><p>{weddingTime}</p></div>
        <div style={{ background: '#fdf4e3', padding: '1rem', borderRadius: '15px', textAlign: 'center' }}><FaMapMarkerAlt size={30} /><h3>स्थान</h3><p>{venue}</p></div>
      </div>
      <div style={{ textAlign: 'center', margin: '1rem' }}><h2>लाइव प्रसारण</h2><iframe src={liveStreamLink} style={{ width: '90%', height: '350px', border: 'none', borderRadius: '15px' }}></iframe></div>
      <div style={{ textAlign: 'center', padding: '2rem' }}><h2>उपस्थिति पुष्टि</h2><form action={rsvpLink} style={{ maxWidth: '400px', margin: '0 auto' }}><input type="text" placeholder="आपका नाम" style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '10px', border: '1px solid #8b0000' }} /><input type="email" placeholder="ईमेल" style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '10px', border: '1px solid #8b0000' }} /><button type="submit" style={{ background: '#8b0000', color: '#ffd700', padding: '0.8rem 2rem', border: 'none', borderRadius: '40px', cursor: 'pointer' }}>पुष्टि करें</button></form></div>
      <div style={{ textAlign: 'center', padding: '1rem' }}><a href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`} style={{ background: '#25D366', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '40px', textDecoration: 'none' }}><FaWhatsapp /> WhatsApp पर बताएं</a></div>
      <footer style={{ background: '#8b0000', color: '#ffd700', textAlign: 'center', padding: '1rem', marginTop: '2rem' }}><p>शुभ विवाह {new Date().getFullYear()} | <FaHeart /></p></footer>
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