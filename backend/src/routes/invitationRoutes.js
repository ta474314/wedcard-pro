const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Invitation = require('../models/Invitation');
const QRCode = require('qrcode');

// @desc    Get all invitations
// @route   GET /api/invitations
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const invitations = await Invitation.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: invitations.length,
      data: invitations
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get single invitation
// @route   GET /api/invitations/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const invitation = await Invitation.findById(req.params.id);
    
    if (!invitation) {
      return res.status(404).json({ success: false, message: 'Invitation not found' });
    }
    
    if (invitation.userId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    
    res.json({ success: true, data: invitation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Create invitation
// @route   POST /api/invitations
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const invitation = await Invitation.create({
      ...req.body,
      userId: req.user.id
    });
    
    res.status(201).json({
      success: true,
      message: 'Invitation created successfully',
      data: invitation
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Update invitation
// @route   PUT /api/invitations/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let invitation = await Invitation.findById(req.params.id);
    
    if (!invitation) {
      return res.status(404).json({ success: false, message: 'Invitation not found' });
    }
    
    if (invitation.userId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    
    invitation = await Invitation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.json({
      success: true,
      message: 'Invitation updated successfully',
      data: invitation
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Delete invitation
// @route   DELETE /api/invitations/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const invitation = await Invitation.findById(req.params.id);
    
    if (!invitation) {
      return res.status(404).json({ success: false, message: 'Invitation not found' });
    }
    
    if (invitation.userId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    
    await invitation.deleteOne();
    
    res.json({ success: true, message: 'Invitation deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Generate QR code for invitation
// @route   POST /api/invitations/:id/qr
// @access  Private
router.post('/:id/qr', protect, async (req, res) => {
  try {
    const invitation = await Invitation.findById(req.params.id);
    
    if (!invitation) {
      return res.status(404).json({ success: false, message: 'Invitation not found' });
    }
    
    const publicHash = invitation._id.toString();
    const publicUrl = `http://localhost:3000/wedding/${publicHash}`;
    
    // Generate QR code as data URL
    const qrCode = await QRCode.toDataURL(publicUrl);
    
    invitation.qrCode = {
      code: qrCode,
      publicHash: publicHash,
      generatedAt: new Date()
    };
    invitation.publicUrl = publicUrl;
    invitation.isPublished = true;
    
    await invitation.save();
    
    res.json({
      success: true,
      message: 'QR code generated successfully',
      data: {
        qrCode: qrCode,
        publicUrl: publicUrl,
        publicHash: publicHash
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;