import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaHeart, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaEnvelope, FaUser, FaUtensils } from 'react-icons/fa';

const WeddingPortalPage = () => {
  const { hash } = useParams();
  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpData, setRsvpData] = useState({
    name: '',
    email: '',
    attending: 'pending',
    guests: 1,
    dietary: 'regular'
  });

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchInvitation();
  }, [hash]);

  const fetchInvitation = async () => {
    try {
      const response = await axios.get(`${API_URL}/invitations/public/${hash}`);
      setInvitation(response.data.data);
    } catch (error) {
      toast.error('Invitation not found');
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/guests`, {
        invitationId: invitation._id,
        ...rsvpData,
        rsvp: {
          status: rsvpData.attending,
          numberOfGuests: rsvpData.guests
        }
      });
      setRsvpSubmitted(true);
      toast.success('RSVP submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit RSVP');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white">
        <div className="text-center">
          <FaHeart className="text-gray-300 text-6xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-dark mb-2">Invitation Not Found</h1>
          <p className="text-gray-600">This invitation may have expired or been removed.</p>
        </div>
      </div>
    );
  }

  const primaryColor = invitation.customColors?.primary || '#FF69B4';
  const secondaryColor = invitation.customColors?.secondary || '#FFB6C1';

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1519741497674-611481863552?w=1200)',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0,0,0,0.4)'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {invitation.couple?.bride} & {invitation.couple?.groom}
            </h1>
            <p className="text-xl md:text-2xl">Are getting married!</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Event Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: primaryColor }}>
            Wedding Celebration
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <FaCalendarAlt className="text-4xl mx-auto mb-3" style={{ color: primaryColor }} />
              <h3 className="font-semibold text-lg mb-2">Date</h3>
              <p className="text-gray-600">
                {invitation.eventDate ? new Date(invitation.eventDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Date TBD'}
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <FaClock className="text-4xl mx-auto mb-3" style={{ color: primaryColor }} />
              <h3 className="font-semibold text-lg mb-2">Time</h3>
              <p className="text-gray-600">{invitation.eventTime || 'Time TBD'}</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <FaMapMarkerAlt className="text-4xl mx-auto mb-3" style={{ color: primaryColor }} />
              <h3 className="font-semibold text-lg mb-2">Venue</h3>
              <p className="text-gray-600">
                {invitation.venue?.name}<br />
                {invitation.venue?.address}<br />
                {invitation.venue?.city}
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <FaHeart className="text-4xl mx-auto mb-3" style={{ color: primaryColor }} />
              <h3 className="font-semibold text-lg mb-2">Message</h3>
              <p className="text-gray-600">{invitation.description || 'Join us as we celebrate our love!'}</p>
            </div>
          </div>
        </div>

        {/* RSVP Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: primaryColor }}>
            Kindly RSVP
          </h2>
          
          {rsvpSubmitted ? (
            <div className="text-center p-8 bg-green-50 rounded-xl">
              <div className="text-green-600 text-6xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h3>
              <p className="text-gray-600">Your response has been recorded. We look forward to celebrating with you!</p>
            </div>
          ) : (
            <form onSubmit={handleRSVP} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaUser className="inline mr-2" /> Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpData.name}
                    onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaEnvelope className="inline mr-2" /> Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={rsvpData.email}
                    onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Will you be attending? *
                </label>
                <div className="flex space-x-4">
                  {['yes', 'no', 'maybe'].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value={option}
                        checked={rsvpData.attending === option}
                        onChange={(e) => setRsvpData({ ...rsvpData, attending: e.target.value })}
                        className="text-primary"
                      />
                      <span className="capitalize">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of guests (including you)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={rsvpData.guests}
                  onChange={(e) => setRsvpData({ ...rsvpData, guests: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaUtensils className="inline mr-2" /> Dietary Preference
                </label>
                <select
                  value={rsvpData.dietary}
                  onChange={(e) => setRsvpData({ ...rsvpData, dietary: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="regular">Regular</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="gluten-free">Gluten Free</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 rounded-lg text-white font-semibold transition"
                style={{ backgroundColor: primaryColor }}
              >
                Submit RSVP
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeddingPortalPage;