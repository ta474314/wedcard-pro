const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  invitationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invitation',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please add guest name']
  },
  email: {
    type: String,
    required: [true, 'Please add guest email']
  },
  phone: String,
  group: String,
  dietaryPreference: {
    type: String,
    enum: ['regular', 'vegetarian', 'vegan', 'gluten-free'],
    default: 'regular'
  },
  rsvp: {
    status: {
      type: String,
      enum: ['pending', 'yes', 'no', 'maybe'],
      default: 'pending'
    },
    respondedAt: Date,
    numberOfGuests: {
      type: Number,
      default: 1
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Guest', guestSchema);