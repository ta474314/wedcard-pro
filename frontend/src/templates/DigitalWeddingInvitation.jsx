import React, { useState, useEffect } from 'react';
import { FaHeart, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaPhone, FaWhatsapp, FaEnvelope, FaQrcode, FaVideo, FaCamera, FaCheckCircle, FaCopy, FaShareAlt } from 'react-icons/fa';

const DigitalWeddingInvitation = ({ data = {} }) => {
  // Default data – will be overridden by props
  const {
    groomName = "Rajesh",
    brideName = "Priya",
    weddingDate = "December 25, 2025",
    weddingTime = "7:00 PM onwards",
    venue = "The Grand Palace, Jaipur, Rajasthan",
    message = "Together with our families, we request the pleasure of your company as we unite in holy matrimony.",
    rsvpLink = "#",
    whatsappNumber = "+919876543210",
    liveStreamLink = "https://example.com/live",
    galleryImages = [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600"
    ],
    qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com/rsvp",
    couplePhoto = "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
  } = data;

  const [timeLeft, setTimeLeft] = useState({});
  const [copied, setCopied] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Countdown timer
  useEffect(() => {
    const targetDate = new Date(weddingDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareInvitation = () => {
    if (navigator.share) {
      navigator.share({
        title: `Wedding Invitation: ${groomName} & ${brideName}`,
        text: `Join us on ${weddingDate} at ${venue}`,
        url: window.location.href,
      });
    } else {
      copyToClipboard();
    }
  };

  // Styles (inline for portability)
  const styles = {
    container: {
      fontFamily: "'Poppins', 'Segoe UI', sans-serif",
      maxWidth: '1200px',
      margin: '0 auto',
      background: '#fffaf5',
      color: '#2d2a26',
      overflowX: 'hidden',
    },
    hero: {
      background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${couplePhoto})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      minHeight: '600px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: 'white',
    },
    heroContent: {
      backdropFilter: 'blur(2px)',
      padding: '2rem',
      borderRadius: '30px',
    },
    coupleNames: {
      fontSize: '4rem',
      fontWeight: '700',
      letterSpacing: '2px',
      marginBottom: '1rem',
      textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
    },
    andSymbol: {
      fontSize: '2rem',
      margin: '0 0.5rem',
    },
    dateBadge: {
      background: 'rgba(255,215,0,0.9)',
      display: 'inline-block',
      padding: '0.5rem 1.5rem',
      borderRadius: '50px',
      color: '#2d2a26',
      fontWeight: '600',
      marginBottom: '1rem',
    },
    countdown: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginTop: '2rem',
      flexWrap: 'wrap',
    },
    countdownBox: {
      background: 'rgba(255,255,255,0.2)',
      backdropFilter: 'blur(10px)',
      padding: '0.8rem 1.2rem',
      borderRadius: '20px',
      minWidth: '80px',
      textAlign: 'center',
    },
    countdownNumber: {
      fontSize: '2rem',
      fontWeight: '700',
    },
    section: {
      padding: '4rem 2rem',
      maxWidth: '1000px',
      margin: '0 auto',
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: '2.2rem',
      marginBottom: '1rem',
      color: '#b8860b',
      position: 'relative',
      display: 'inline-block',
    },
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      marginTop: '2rem',
    },
    detailCard: {
      background: 'white',
      padding: '1.5rem',
      borderRadius: '20px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
      transition: 'transform 0.3s',
    },
    icon: {
      fontSize: '2.5rem',
      color: '#b8860b',
      marginBottom: '1rem',
    },
    rsvpForm: {
      background: '#f9f1e6',
      padding: '2rem',
      borderRadius: '30px',
      marginTop: '2rem',
    },
    inputGroup: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
      marginBottom: '1rem',
    },
    input: {
      padding: '0.8rem',
      borderRadius: '12px',
      border: '1px solid #e2c8a2',
      fontSize: '1rem',
      width: '100%',
    },
    textarea: {
      width: '100%',
      padding: '0.8rem',
      borderRadius: '12px',
      border: '1px solid #e2c8a2',
      fontSize: '1rem',
      marginBottom: '1rem',
    },
    button: {
      background: 'linear-gradient(135deg, #b8860b, #daa520)',
      color: 'white',
      border: 'none',
      padding: '0.8rem 2rem',
      borderRadius: '50px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    },
    galleryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1rem',
      marginTop: '2rem',
    },
    galleryImg: {
      width: '100%',
      height: '250px',
      objectFit: 'cover',
      borderRadius: '20px',
      cursor: 'pointer',
      transition: 'transform 0.3s',
    },
    qrContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem',
      flexWrap: 'wrap',
      marginTop: '2rem',
    },
    qrCode: {
      width: '150px',
      height: '150px',
      background: 'white',
      padding: '0.5rem',
      borderRadius: '20px',
    },
    footer: {
      background: '#2d2a26',
      color: '#ccc',
      textAlign: 'center',
      padding: '2rem',
      marginTop: '2rem',
    },
    liveStreamBox: {
      background: '#000',
      borderRadius: '20px',
      overflow: 'hidden',
      marginTop: '1rem',
    },
    liveIframe: {
      width: '100%',
      height: '400px',
      border: 'none',
    },
    flexRow: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      flexWrap: 'wrap',
      marginTop: '1rem',
    },
    whatsappBtn: {
      background: '#25D366',
      color: 'white',
      padding: '0.6rem 1.2rem',
      borderRadius: '50px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      textDecoration: 'none',
      fontWeight: '600',
    },
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.dateBadge}>SAVE THE DATE</div>
          <div style={styles.coupleNames}>
            {groomName} <span style={styles.andSymbol}>&</span> {brideName}
          </div>
          <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>are getting married</p>
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
            <FaCalendarAlt style={{ marginRight: '0.5rem' }} /> {weddingDate}
          </p>
          <div style={styles.countdown}>
            <div style={styles.countdownBox}><div style={styles.countdownNumber}>{timeLeft.days || 0}</div><div>Days</div></div>
            <div style={styles.countdownBox}><div style={styles.countdownNumber}>{timeLeft.hours || 0}</div><div>Hours</div></div>
            <div style={styles.countdownBox}><div style={styles.countdownNumber}>{timeLeft.minutes || 0}</div><div>Minutes</div></div>
            <div style={styles.countdownBox}><div style={styles.countdownNumber}>{timeLeft.seconds || 0}</div><div>Seconds</div></div>
          </div>
        </div>
      </div>

      {/* Message Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Wedding Message</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '700px', margin: '1rem auto' }}>{message}</p>
        <div style={styles.flexRow}>
          <a href={liveStreamLink} target="_blank" rel="noopener noreferrer" style={styles.whatsappBtn}>
            <FaVideo /> Watch Live Stream
          </a>
          <a href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={styles.whatsappBtn}>
            <FaWhatsapp /> WhatsApp Us
          </a>
        </div>
      </div>

      {/* Event Details */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Event Details</h2>
        <div style={styles.detailsGrid}>
          <div style={styles.detailCard}><FaCalendarAlt style={styles.icon} /><h3>Date</h3><p>{weddingDate}</p></div>
          <div style={styles.detailCard}><FaClock style={styles.icon} /><h3>Time</h3><p>{weddingTime}</p></div>
          <div style={styles.detailCard}><FaMapMarkerAlt style={styles.icon} /><h3>Venue</h3><p>{venue}</p></div>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <a href={`https://maps.google.com/?q=${encodeURIComponent(venue)}`} target="_blank" style={styles.button}>Get Directions</a>
        </div>
      </div>

      {/* Photo Gallery */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Photo Gallery</h2>
        <div style={styles.galleryGrid}>
          {galleryImages.map((img, idx) => (
            <img key={idx} src={img} alt={`Gallery ${idx+1}`} style={styles.galleryImg} onClick={() => setActiveImage(idx)} />
          ))}
        </div>
        {activeImage !== null && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, cursor: 'pointer' }} onClick={() => setActiveImage(null)}>
            <img src={galleryImages[activeImage]} alt="Full size" style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '20px' }} />
          </div>
        )}
      </div>

      {/* Live Streaming */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Live Streaming</h2>
        <p>Can't make it in person? Join us online.</p>
        <div style={styles.liveStreamBox}>
          <iframe src={liveStreamLink} title="Live Stream" style={styles.liveIframe} allowFullScreen></iframe>
        </div>
      </div>

      {/* RSVP Form */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>RSVP</h2>
        <p>Please let us know if you can attend by <strong>December 10, 2025</strong>.</p>
        <div style={styles.rsvpForm}>
          <form action={rsvpLink} method="POST">
            <div style={styles.inputGroup}>
              <input type="text" placeholder="Your Name" style={styles.input} required />
              <input type="email" placeholder="Email" style={styles.input} required />
            </div>
            <div style={styles.inputGroup}>
              <input type="tel" placeholder="Phone Number" style={styles.input} />
              <select style={styles.input}>
                <option>Will Attend</option>
                <option>Will Not Attend</option>
                <option>Maybe</option>
              </select>
            </div>
            <textarea rows="3" placeholder="Any message for the couple?" style={styles.textarea}></textarea>
            <div>
              <button type="submit" style={styles.button}>Submit RSVP</button>
            </div>
          </form>
        </div>
      </div>

      {/* QR Code & Sharing */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Share Invitation</h2>
        <div style={styles.qrContainer}>
          <div>
            <img src={qrCodeUrl} alt="QR Code" style={styles.qrCode} />
            <p>Scan to RSVP</p>
          </div>
          <div>
            <button onClick={shareInvitation} style={{ ...styles.button, background: '#4CAF50' }}><FaShareAlt /> Share Invitation</button>
            <button onClick={copyToClipboard} style={{ ...styles.button, marginLeft: '1rem' }}><FaCopy /> {copied ? 'Copied!' : 'Copy Link'}</button>
            <p style={{ marginTop: '1rem', fontSize: '0.8rem' }}>Share this page with family & friends</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p>© 2025 {groomName} & {brideName} | Digital Wedding Invitation</p>
        <p>For any queries, contact us on <FaWhatsapp /> {whatsappNumber}</p>
        <p style={{ fontSize: '0.7rem' }}>Powered by WedCard Pro</p>
      </div>
    </div>
  );
};

export default DigitalWeddingInvitation;