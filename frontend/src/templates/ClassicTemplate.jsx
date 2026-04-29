import React, { useState, useEffect } from 'react';
import { FaHeart, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaPhone, FaWhatsapp, FaEnvelope, FaQrcode, FaVideo, FaCamera, FaCheckCircle, FaCopy, FaShareAlt } from 'react-icons/fa';

const ClassicTemplate = ({ data }) => {
  const {
    groomName = "Rajesh", brideName = "Priya", weddingDate = "December 25, 2025",
    weddingTime = "7:00 PM onwards", venue = "The Grand Palace, Jaipur",
    message = "Together with our families, we request the pleasure of your company as we unite in holy matrimony.",
    rsvpLink = "#", whatsappNumber = "+919876543210", liveStreamLink = "https://example.com/live",
    galleryImages = ["https://images.unsplash.com/photo-1519741497674-611481863552?w=600", "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600"],
    qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com/rsvp",
    couplePhoto = "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
  } = data;

  const [timeLeft, setTimeLeft] = useState({});
  const [activeImage, setActiveImage] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const target = new Date(weddingDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff < 0) { clearInterval(interval); setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / (1000*60*60*24)),
        hours: Math.floor((diff % (86400000)) / (1000*60*60)),
        minutes: Math.floor((diff % (3600000)) / (1000*60)),
        seconds: Math.floor((diff % (60000)) / 1000)
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  const copyLink = () => { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const share = () => { if (navigator.share) navigator.share({ title: `${groomName} & ${brideName} Wedding`, url: window.location.href }); else copyLink(); };

  const styles = {
    container: { fontFamily: "'Georgia', 'Times New Roman', serif", maxWidth: '1000px', margin: '0 auto', background: '#fffaf2', color: '#3b2a1f' },
    hero: { background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${couplePhoto})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'white' },
    overlay: { background: 'rgba(0,0,0,0.5)', padding: '2rem', borderRadius: '30px' },
    names: { fontSize: '3.5rem', fontWeight: 'bold', letterSpacing: '2px' },
    border: { borderTop: '2px solid #b8860b', borderBottom: '2px solid #b8860b', padding: '1rem 0', margin: '1rem 0' },
    section: { padding: '3rem 2rem', textAlign: 'center' },
    title: { fontSize: '2rem', color: '#b8860b', marginBottom: '1.5rem', fontFamily: "'Playfair Display', serif" },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' },
    card: { background: 'white', padding: '1.5rem', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' },
    icon: { fontSize: '2rem', color: '#b8860b', marginBottom: '0.5rem' },
    button: { background: '#b8860b', color: 'white', border: 'none', padding: '0.8rem 1.8rem', borderRadius: '40px', cursor: 'pointer', fontWeight: 'bold' },
    galleryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' },
    img: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '15px', cursor: 'pointer' },
    footer: { background: '#2d2a26', color: '#ccc', padding: '2rem', textAlign: 'center' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}><div style={styles.overlay}><div style={styles.names}>{groomName} & {brideName}</div><p>are getting married</p><div style={styles.border}><p>📅 {weddingDate} | ⏰ {weddingTime}</p></div></div></div>
      <div style={styles.section}><h2 style={styles.title}>Our Love Story</h2><p>{message}</p><div style={styles.grid}><div style={styles.card}><FaCalendarAlt style={styles.icon} /><h3>Date</h3><p>{weddingDate}</p></div><div style={styles.card}><FaClock style={styles.icon} /><h3>Time</h3><p>{weddingTime}</p></div><div style={styles.card}><FaMapMarkerAlt style={styles.icon} /><h3>Venue</h3><p>{venue}</p></div></div></div>
      <div style={styles.section}><h2 style={styles.title}>Countdown to Forever</h2><div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>{Object.entries(timeLeft).map(([unit, val]) => (<div key={unit} style={{ background: '#b8860b', color: 'white', padding: '0.5rem 1rem', borderRadius: '10px', minWidth: '70px' }}><div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{val}</div><div>{unit}</div></div>))}</div></div>
      <div style={styles.section}><h2 style={styles.title}>Photo Gallery</h2><div style={styles.galleryGrid}>{galleryImages.map((img, idx) => <img key={idx} src={img} style={styles.img} onClick={() => setActiveImage(idx)} />)}</div>{activeImage !== null && <div style={{ position: 'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.9)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }} onClick={() => setActiveImage(null)}><img src={galleryImages[activeImage]} style={{ maxWidth: '90%', maxHeight: '90%' }} /></div>}</div>
      <div style={styles.section}><h2 style={styles.title}>Live Streaming</h2><iframe src={liveStreamLink} style={{ width: '100%', height: '400px', border: 'none', borderRadius: '20px' }} title="Live Stream"></iframe></div>
      <div style={styles.section}><h2 style={styles.title}>RSVP</h2><form action={rsvpLink} method="POST" style={{ maxWidth: '500px', margin: '0 auto', background: '#f9f1e6', padding: '2rem', borderRadius: '30px' }}><input type="text" placeholder="Your Name" style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '10px', border: '1px solid #ddd' }} /><input type="email" placeholder="Email" style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '10px', border: '1px solid #ddd' }} /><select style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '10px' }}><option>Will Attend</option><option>Will Not Attend</option></select><button type="submit" style={styles.button}>Submit RSVP</button></form></div>
      <div style={styles.section}><h2 style={styles.title}>Share Invitation</h2><div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}><button onClick={share} style={styles.button}><FaShareAlt /> Share</button><button onClick={copyLink} style={styles.button}><FaCopy /> {copied ? 'Copied!' : 'Copy Link'}</button><a href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`} style={{ ...styles.button, background: '#25D366' }}><FaWhatsapp /> WhatsApp</a></div><img src={qrCodeUrl} alt="QR" style={{ width: '120px', marginTop: '1rem' }} /></div>
      <div style={styles.footer}><p>© {new Date().getFullYear()} {groomName} & {brideName} | Digital Wedding Invitation</p><p>Made with <FaHeart style={{ color: '#FF3366' }} /> by WedCard Pro</p></div>
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