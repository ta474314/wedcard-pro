import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaHeart, FaArrowLeft, FaSave, FaQrcode, FaShare } from 'react-icons/fa';
import { QRCodeCanvas } from 'qrcode.react';

const EditInvitationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [invitation, setInvitation] = useState(null);
  const [showQR, setShowQR] = useState(false);

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchInvitation();
  }, [id]);

  const fetchInvitation = async () => {
    try {
      const response = await axios.get(`${API_URL}/invitations/${id}`);
      setInvitation(response.data.data);
    } catch (error) {
      toast.error('Failed to load invitation');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setInvitation(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setInvitation(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`${API_URL}/invitations/${id}`, invitation);
      toast.success('Invitation updated successfully');
    } catch (error) {
      toast.error('Failed to update invitation');
    } finally {
      setSaving(false);
    }
  };

  const generateQR = async () => {
    try {
      const response = await axios.post(`${API_URL}/invitations/${id}/qr`);
      setInvitation(prev => ({
        ...prev,
        qrCode: response.data.data,
        isPublished: true,
        publicUrl: response.data.data.publicUrl
      }));
      setShowQR(true);
      toast.success('QR code generated! Share this link with your guests.');
    } catch (error) {
      toast.error('Failed to generate QR code');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-600 hover:text-primary">
                <FaArrowLeft />
              </Link>
              <div className="flex items-center space-x-2">
                <FaHeart className="text-primary text-xl" />
                <span className="text-xl font-bold text-dark">Edit Invitation</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {!invitation.qrCode && (
                <button 
                  onClick={generateQR}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700"
                >
                  <FaQrcode />
                  <span>Generate QR Code</span>
                </button>
              )}
              <button 
                onClick={handleSubmit}
                disabled={saving}
                className="bg-primary text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-opacity-90"
              >
                <FaSave />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-dark mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invitation Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={invitation.title || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bride's Name *
                    </label>
                    <input
                      type="text"
                      name="couple.bride"
                      value={invitation.couple?.bride || ''}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Groom's Name *
                    </label>
                    <input
                      type="text"
                      name="couple.groom"
                      value={invitation.couple?.groom || ''}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      value={invitation.eventDate?.split('T')[0] || ''}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Time *
                    </label>
                    <input
                      type="time"
                      name="eventTime"
                      value={invitation.eventTime || ''}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Venue Name
                  </label>
                  <input
                    type="text"
                    name="venue.name"
                    value={invitation.venue?.name || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={invitation.description || ''}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* QR Code Card */}
            {showQR && invitation.qrCode && (
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <h2 className="text-xl font-bold text-dark mb-4">Your QR Code</h2>
                <div className="flex justify-center mb-4">
                  <img src={invitation.qrCode.code} alt="QR Code" className="w-48 h-48" />
                </div>
                <p className="text-sm text-gray-600 mb-3">Scan to view wedding portal</p>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={invitation.publicUrl}
                    readOnly
                    className="w-full px-3 py-2 text-sm border rounded-lg bg-gray-50"
                  />
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(invitation.publicUrl);
                      toast.success('Link copied!');
                    }}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
                  >
                    Copy Link
                  </button>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2">
                    <FaShare />
                    <span>Share Invitation</span>
                  </button>
                </div>
              </div>
            )}

            {/* Stats Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-dark mb-4">Invitation Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-semibold ${invitation.isPublished ? 'text-green-600' : 'text-yellow-600'}`}>
                    {invitation.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Views:</span>
                  <span className="font-semibold">{invitation.stats?.totalViews || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">RSVP Yes:</span>
                  <span className="font-semibold text-green-600">{invitation.stats?.rsvpCount?.yes || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span className="font-semibold">{new Date(invitation.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Actions Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-dark mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link 
                  to={`/guests/${invitation._id}`}
                  className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700"
                >
                  Manage Guests
                </Link>
                {!invitation.qrCode && (
                  <button 
                    onClick={generateQR}
                    className="block w-full bg-purple-600 text-white text-center py-2 rounded-lg hover:bg-purple-700"
                  >
                    Generate QR Code
                  </button>
                )}
                {invitation.publicUrl && (
                  <a 
                    href={invitation.publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gray-600 text-white text-center py-2 rounded-lg hover:bg-gray-700"
                  >
                    View Wedding Portal
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInvitationPage;