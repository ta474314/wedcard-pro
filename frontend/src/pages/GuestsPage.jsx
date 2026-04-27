import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaDownload, FaUpload } from 'react-icons/fa';

const GuestsPage = () => {
  const { invitationId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingGuest, setEditingGuest] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    group: '',
    dietaryPreference: 'regular',
    rsvp: {
      status: 'pending',
      numberOfGuests: 1
    }
  });

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchGuests();
  }, [invitationId]);

  const fetchGuests = async () => {
    try {
      const response = await axios.get(`${API_URL}/guests?invitationId=${invitationId}`);
      setGuests(response.data.data);
    } catch (error) {
      toast.error('Failed to load guests');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingGuest) {
        await axios.put(`${API_URL}/guests/${editingGuest._id}`, formData);
        toast.success('Guest updated successfully');
      } else {
        await axios.post(`${API_URL}/guests`, {
          ...formData,
          invitationId,
          userId: user._id
        });
        toast.success('Guest added successfully');
      }
      setShowModal(false);
      setEditingGuest(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        group: '',
        dietaryPreference: 'regular',
        rsvp: { status: 'pending', numberOfGuests: 1 }
      });
      fetchGuests();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this guest?')) {
      try {
        await axios.delete(`${API_URL}/guests/${id}`);
        toast.success('Guest deleted');
        fetchGuests();
      } catch (error) {
        toast.error('Failed to delete guest');
      }
    }
  };

  const updateRSVP = async (id, status) => {
    try {
      await axios.put(`${API_URL}/guests/${id}/rsvp`, { status });
      toast.success('RSVP updated');
      fetchGuests();
    } catch (error) {
      toast.error('Failed to update RSVP');
    }
  };

  const exportGuests = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'Group', 'Dietary', 'RSVP', 'Guests'],
      ...guests.map(g => [g.name, g.email, g.phone, g.group, g.dietaryPreference, g.rsvp.status, g.rsvp.numberOfGuests])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `guests_${invitationId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = {
    total: guests.length,
    confirmed: guests.filter(g => g.rsvp.status === 'yes').length,
    pending: guests.filter(g => g.rsvp.status === 'pending').length,
    declined: guests.filter(g => g.rsvp.status === 'no').length
  };

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
              <h1 className="text-2xl font-bold text-dark">Guest Management</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={exportGuests}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700"
              >
                <FaDownload />
                <span>Export CSV</span>
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-opacity-90"
              >
                <FaPlus />
                <span>Add Guest</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Guests', value: stats.total, color: 'bg-blue-500' },
            { label: 'Confirmed', value: stats.confirmed, color: 'bg-green-500' },
            { label: 'Pending', value: stats.pending, color: 'bg-yellow-500' },
            { label: 'Declined', value: stats.declined, color: 'bg-red-500' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-dark mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Guests Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RSVP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    </td>
                  </tr>
                ) : guests.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      No guests added yet. Click "Add Guest" to get started.
                    </td>
                  </tr>
                ) : (
                  guests.map((guest) => (
                    <tr key={guest._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{guest.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{guest.email}</div>
                        <div className="text-sm text-gray-500">{guest.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500">{guest.group || 'General'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={guest.rsvp.status}
                          onChange={(e) => updateRSVP(guest._id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            guest.rsvp.status === 'yes' ? 'bg-green-100 text-green-800' :
                            guest.rsvp.status === 'no' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="yes">Confirmed</option>
                          <option value="no">Declined</option>
                          <option value="maybe">Maybe</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => {
                              setEditingGuest(guest);
                              setFormData({
                                name: guest.name,
                                email: guest.email,
                                phone: guest.phone || '',
                                group: guest.group || '',
                                dietaryPreference: guest.dietaryPreference || 'regular',
                                rsvp: guest.rsvp
                              });
                              setShowModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(guest._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-dark mb-4">
                {editingGuest ? 'Edit Guest' : 'Add New Guest'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Group
                  </label>
                  <input
                    type="text"
                    value={formData.group}
                    onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Family, Friends, Colleagues"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dietary Preference
                  </label>
                  <select
                    value={formData.dietaryPreference}
                    onChange={(e) => setFormData({ ...formData, dietaryPreference: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="regular">Regular</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="gluten-free">Gluten Free</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingGuest(null);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        group: '',
                        dietaryPreference: 'regular',
                        rsvp: { status: 'pending', numberOfGuests: 1 }
                      });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
                  >
                    {editingGuest ? 'Update' : 'Add'} Guest
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestsPage;