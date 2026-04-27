const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a title']
  },
  couple: {
    bride: { type: String, required: true },
    groom: { type: String, required: true }
  },
  eventDate: {
    type: Date,
    required: true
  },
  eventTime: {
    type: String,
    required: true
  },
  venue: {
    name: String,
    address: String,
    city: String,
    mapLink: String
  },
  description: {
    type: String,
    default: ''
  },
  template: {
    type: String,
    default: 'classic'
  },
  customColors: {
    primary: { type: String, default: '#FF69B4' },
    secondary: { type: String, default: '#FFB6C1' },
    text: { type: String, default: '#333333' }
  },
  qrCode: {
    code: String,
    publicHash: String,
    generatedAt: Date
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publicUrl: {
    type: String,
    default: ''
  },
  stats: {
    totalViews: { type: Number, default: 0 },
    uniqueViews: { type: Number, default: 0 },
    rsvpCount: {
      yes: { type: Number, default: 0 },
      no: { type: Number, default: 0 },
      maybe: { type: Number, default: 0 }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Invitation', invitationSchema);