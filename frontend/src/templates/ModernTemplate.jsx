import React, { useState, useEffect } from 'react';
import { FaHeart, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaWhatsapp, FaVideo, FaCopy, FaShareAlt, FaInstagram, FaFacebook } from 'react-icons/fa';

const ModernTemplate = ({ data }) => {
  const { groomName, brideName, weddingDate, weddingTime, venue, message, rsvpLink, whatsappNumber, liveStreamLink, galleryImages, qrCodeUrl, couplePhoto } = data;
  const [timeLeft, setTimeLeft] = useState({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const target = new Date(weddingDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff < 0) { clearInterval(interval); return; }
      setTimeLeft({ days: Math.floor(diff / (1000*60*60*24)), hours: Math.floor((diff % (86400000)) / (1000*60*60)), minutes: Math.floor((diff % (3600000)) / (1000*60)), seconds: Math.floor((diff % (60000)) / 1000) });
    }, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  const share = () => { if (navigator.share) navigator.share({ title: `${groomName} & ${brideName} Wedding`, url: window.location.href }); else { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); } };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", maxWidth: '1200px', margin: '0 auto', background: '#fafafa' }}>
      <div style={{ background: `linear-gradient(135deg, #2c3e50, #3498db)`, color: 'white', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem' }}>{groomName} & {brideName}</h1>
        <p>We're getting married!</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
          <div><div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{timeLeft.days || 0}</div><div>Days</div></div>
          <div><div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{timeLeft.hours || 0}</div><div>Hours</div></div>
          <div><div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{timeLeft.minutes || 0}</div><div>Minutes</div></div>
          <div><div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{timeLeft.seconds || 0}</div><div>Seconds</div></div>
        </div>
      </div>
      <div style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}><p style={{ fontSize: '1.2rem' }}>{message}</p></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', padding: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}><FaCalendarAlt size={30} color="#e67e22" /><h3>Date</h3><p>{weddingDate}</p></div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}><FaClock size={30} color="#e67e22" /><h3>Time</h3><p>{weddingTime}</p></div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}><FaMapMarkerAlt size={30} color="#e67e22" /><h3>Venue</h3><p>{venue}</p></div>
      </div>
      <div style={{ textAlign: 'center', margin: '2rem' }}><h2>Live Stream</h2><iframe src={liveStreamLink} style={{ width: '100%', maxWidth: '800px', height: '400px', border: 'none', borderRadius: '20px' }} title="live"></iframe></div>
      <div style={{ padding: '2rem', textAlign: 'center' }}><h2>RSVP</h2><form action={rsvpLink} method="POST" style={{ maxWidth: '400px', margin: '0 auto' }}><input type="text" placeholder="Name" style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '10px', border: '1px solid #ccc' }} /><input type="email" placeholder="Email" style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '10px', border: '1px solid #ccc' }} /><button type="submit" style={{ background: '#e67e22', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '40px', cursor: 'pointer' }}>Submit</button></form></div>
      <div style={{ textAlign: 'center', padding: '2rem' }}><button onClick={share} style={{ background: '#2c3e50', color: 'white', padding: '0.8rem 1.8rem', borderRadius: '40px', border: 'none', cursor: 'pointer' }}><FaShareAlt /> Share Invitation</button><a href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`} style={{ display: 'inline-block', marginLeft: '1rem', background: '#25D366', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '40px', textDecoration: 'none' }}><FaWhatsapp /> WhatsApp</a></div>
      <footer style={{ background: '#2c3e50', color: 'white', textAlign: 'center', padding: '1.5rem' }}><p>© {groomName} & {brideName} | WedCard Pro</p></footer>
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