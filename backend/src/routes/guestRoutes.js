const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Guest = require('../models/Guest');
const Invitation = require('../models/Invitation');

// @desc    Get all guests for an invitation
// @route   GET /api/guests?invitationId=:id
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { invitationId } = req.query;
    
    if (!invitationId) {
      return res.status(400).json({ success: false, message: 'invitationId is required' });
    }
    
    const invitation = await Invitation.findById(invitationId);
    
    if (!invitation) {
      return res.status(404).json({ success: false, message: 'Invitation not found' });
    }
    
    if (invitation.userId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    
    const guests = await Guest.find({ invitationId, userId: req.user.id });
    
    res.json({
      success: true,
      count: guests.length,
      data: guests
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Add guest
// @route   POST /api/guests
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const guest = await Guest.create({
      ...req.body,
      userId: req.user.id
    });
    
    res.status(201).json({
      success: true,
      message: 'Guest added successfully',
      data: guest
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Update guest
// @route   PUT /api/guests/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let guest = await Guest.findById(req.params.id);
    
    if (!guest) {
      return res.status(404).json({ success: false, message: 'Guest not found' });
    }
    
    if (guest.userId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    
    guest = await Guest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.json({
      success: true,
      message: 'Guest updated successfully',
      data: guest
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Delete guest
// @route   DELETE /api/guests/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    
    if (!guest) {
      return res.status(404).json({ success: false, message: 'Guest not found' });
    }
    
    if (guest.userId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    
    await guest.deleteOne();
    
    res.json({ success: true, message: 'Guest deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Update RSVP
// @route   PUT /api/guests/:id/rsvp
// @access  Private
router.put('/:id/rsvp', protect, async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    
    if (!guest) {
      return res.status(404).json({ success: false, message: 'Guest not found' });
    }
    
    if (guest.userId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    
    guest.rsvp = {
      status: req.body.status,
      respondedAt: new Date(),
      numberOfGuests: req.body.numberOfGuests || guest.rsvp.numberOfGuests
    };
    
    await guest.save();
    
    // Update invitation stats
    const invitation = await Invitation.findById(guest.invitationId);
    if (invitation) {
      const stats = await Guest.aggregate([
        { $match: { invitationId: guest.invitationId } },
        { $group: {
          _id: '$rsvp.status',
          count: { $sum: 1 }
        }}
      ]);
      
      invitation.stats.rsvpCount = {
        yes: stats.find(s => s._id === 'yes')?.count || 0,
        no: stats.find(s => s._id === 'no')?.count || 0,
        maybe: stats.find(s => s._id === 'maybe')?.count || 0
      };
      await invitation.save();
    }
    
    res.json({
      success: true,
      message: 'RSVP updated successfully',
      data: guest
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;