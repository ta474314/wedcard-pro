import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  FaHeart, FaArrowLeft, FaSave, FaMagic, FaSpinner,
  FaUser, FaCalendar, FaClock, FaMapMarkerAlt, FaPalette,
  FaQuoteLeft, FaStar, FaRobot, FaUsers, FaPenFancy,
  FaDownload, FaEdit, FaEye
} from 'react-icons/fa';
import '../styles/Templates.css';

// Import templates
import ClassicTemplate from '../templates/ClassicTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import TraditionalTemplate from '../templates/TraditionalTemplate';
import BeachTemplate from '../templates/BeachTemplate';
import GardenTemplate from '../templates/GardenTemplate';
import LuxuryTemplate from '../templates/LuxuryTemplate';

const CreateInvitationPage = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('manual');
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [showPreview, setShowPreview] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    couple: { bride: '', groom: '' },
    parents: { brideFather: '', brideMother: '', groomFather: '', groomMother: '' },
    eventDate: '',
    eventTime: '',
    venue: { name: '', address: '', city: '', pincode: '' },
    description: '',
    dressCode: '',
    additionalInfo: '',
    theme: 'Romantic',
    template: 'classic',
    customColors: { primary: '#FF69B4', secondary: '#FFB6C1', text: '#333333' },
    guestCount: 100,
    rsvpDeadline: '',
    templateId: 'classic'
  });

  const [storyInput, setStoryInput] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [aiLoadingStory, setAiLoadingStory] = useState(false);

  const API_URL = 'http://localhost:5000/api';

  const templates = [
    { id: 'classic', name: 'Classic Elegance', icon: '📜', component: ClassicTemplate, description: 'Timeless and traditional design perfect for formal weddings' },
    { id: 'modern', name: 'Modern Minimal', icon: '✨', component: ModernTemplate, description: 'Clean lines and contemporary style' },
    { id: 'traditional', name: 'Traditional Indian', icon: '🪔', component: TraditionalTemplate, description: 'Rich cultural elements and heritage design' },
    { id: 'beach', name: 'Beach Paradise', icon: '🏖️', component: BeachTemplate, description: 'Tropical vibes for destination weddings' },
    { id: 'garden', name: 'Garden Romance', icon: '🌿', component: GardenTemplate, description: 'Fresh and natural garden party theme' },
    { id: 'luxury', name: 'Luxury Gold', icon: '👑', component: LuxuryTemplate, description: 'Premium design with golden accents' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const generateFromStory = async () => {
    if (!storyInput.trim()) {
      toast.error('Please describe your wedding details first');
      return;
    }
    
    setAiLoadingStory(true);
    setShowAIPanel(true);
    
    setTimeout(() => {
      const text = storyInput.toLowerCase();
      let brideName = '';
      let groomName = '';
      
      const brideMatch = storyInput.match(/bride[:\s]+([A-Za-z\s]+?)(?=,|\.|groom|$)/i);
      const groomMatch = storyInput.match(/groom[:\s]+([A-Za-z\s]+?)(?=,|\.|bride|$)/i);
      
      if (brideMatch) brideName = brideMatch[1].trim();
      if (groomMatch) groomName = groomMatch[1].trim();
      
      if (!brideName && !groomName) {
        const andMatch = storyInput.match(/([A-Za-z]+)\s+and\s+([A-Za-z]+)/i);
        if (andMatch) {
          brideName = andMatch[1];
          groomName = andMatch[2];
        }
      }
      
      const datePattern = /(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})|(\d{4}-\d{2}-\d{2})/i;
      const dateMatch = storyInput.match(datePattern);
      const eventDate = dateMatch ? dateMatch[0] : '';
      
      const timePattern = /(\d{1,2}(?::\d{2})?\s*(?:am|pm))/i;
      const timeMatch = storyInput.match(timePattern);
      const eventTime = timeMatch ? timeMatch[0] : '';
      
      const venuePattern = /at\s+([A-Za-z\s]+?)(?:,|\.|$)/i;
      const venueMatch = storyInput.match(venuePattern);
      const venueName = venueMatch ? venueMatch[1].trim() : '';
      
      let theme = 'Romantic';
      if (text.includes('beach')) theme = 'Beach';
      else if (text.includes('garden')) theme = 'Garden';
      else if (text.includes('modern')) theme = 'Modern';
      else if (text.includes('traditional')) theme = 'Traditional';
      else if (text.includes('luxury')) theme = 'Luxury';
      
      const mockSuggestions = {
        invitation: {
          title: brideName && groomName ? `${brideName} & ${groomName}'s Wedding` : 'Wedding Celebration',
          message: `We are overjoyed to invite you to celebrate our wedding as we begin our journey together. Join us for a day filled with love, laughter, and cherished memories.`,
          colors: theme === 'Beach' ? ["#87CEEB", "#FFE4B5", "#F0E68C"] :
                  theme === 'Garden' ? ["#98FB98", "#FFB6C1", "#9370DB"] :
                  theme === 'Modern' ? ["#2C3E50", "#E74C3C", "#ECF0F1"] :
                  theme === 'Luxury' ? ["#FFD700", "#800020", "#1A1A1A"] :
                  ["#FF69B4", "#FFB6C1", "#FFD700"]
        }
      };
      
      setAiSuggestions(mockSuggestions);
      
      setFormData(prev => ({
        ...prev,
        title: mockSuggestions.invitation.title,
        couple: { bride: brideName || prev.couple.bride, groom: groomName || prev.couple.groom },
        eventDate: eventDate || prev.eventDate,
        eventTime: eventTime || prev.eventTime,
        venue: { ...prev.venue, name: venueName || prev.venue.name },
        description: mockSuggestions.invitation.message,
        theme: theme
      }));
      
      toast.success('AI extracted details from your story!');
      setAiLoadingStory(false);
    }, 1500);
  };

  const applyAISuggestion = (field, value) => {
    if (field === 'title') {
      setFormData(prev => ({ ...prev, title: value }));
      toast.success('Title updated!');
    } else if (field === 'description') {
      setFormData(prev => ({ ...prev, description: value }));
      toast.success('Description updated!');
    } else if (field === 'color') {
      setFormData(prev => ({
        ...prev,
        customColors: { ...prev.customColors, primary: value }
      }));
      toast.success('Theme color updated!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.couple.bride || !formData.couple.groom) {
      toast.error('Please enter bride and groom names');
      return;
    }
    
    if (!formData.eventDate || !formData.eventTime) {
      toast.error('Please enter event date and time');
      return;
    }
    
    setLoading(true);
    
    const invitationData = {
      ...formData,
      template: selectedTemplate,
      userId: user?._id
    };
    
    try {
      const response = await axios.post(`${API_URL}/invitations`, invitationData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        toast.success('Invitation created successfully!');
        navigate(`/edit-invitation/${response.data.data._id}`);
      } else {
        toast.error('Failed to create invitation');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save invitation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const CurrentTemplate = templates.find(t => t.id === selectedTemplate)?.component || ClassicTemplate;

  return (
    <div className="create-invitation-container">
      <div className="create-header">
        <div className="create-header-content">
          <Link to="/dashboard" className="back-btn">
            <FaArrowLeft /> Back to Dashboard
          </Link>
          <div className="header-title">
            <FaHeart className="title-icon" />
            <h1>Create Wedding Invitation</h1>
          </div>
          <button onClick={() => setShowPreview(!showPreview)} className="preview-toggle-btn">
            <FaEye /> {showPreview ? 'Edit Mode' : 'Preview Mode'}
          </button>
        </div>
      </div>

      <div className="create-content">
        <div className="tab-switcher">
          <button className={`tab-btn ${activeTab === 'manual' ? 'active' : ''}`} onClick={() => setActiveTab('manual')}>
            <FaPenFancy /> Manual Entry
          </button>
          <button className={`tab-btn ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => setActiveTab('ai')}>
            <FaMagic /> AI Story Generator
          </button>
        </div>

        {showPreview ? (
          <div className="preview-section">
            <div className="preview-header">
              <h2>Live Preview</h2>
              <p>Your invitation will look like this</p>
            </div>
            <CurrentTemplate data={formData} colors={formData.customColors} />
          </div>
        ) : (
          <>
            {activeTab === 'manual' && (
              <form onSubmit={handleSubmit} className="manual-form">
                {/* Template Selection */}
                <div className="form-section">
                  <h2><FaStar className="section-icon" /> Choose Template</h2>
                  <div className="templates-grid">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`template-option ${selectedTemplate === template.id ? 'selected' : ''}`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div className="template-option-icon">{template.icon}</div>
                        <div className="template-option-info">
                          <h4>{template.name}</h4>
                          <p>{template.description}</p>
                        </div>
                        {selectedTemplate === template.id && <div className="selected-badge">✓</div>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Couple Details */}
                <div className="form-section">
                  <h2><FaUser className="section-icon" /> Couple Details</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Bride's Name *</label>
                      <input type="text" name="couple.bride" value={formData.couple.bride} onChange={handleChange} required placeholder="Enter bride's name" />
                    </div>
                    <div className="form-group">
                      <label>Groom's Name *</label>
                      <input type="text" name="couple.groom" value={formData.couple.groom} onChange={handleChange} required placeholder="Enter groom's name" />
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="form-section">
                  <h2><FaCalendar className="section-icon" /> Event Details</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Event Date *</label>
                      <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label>Event Time *</label>
                      <input type="time" name="eventTime" value={formData.eventTime} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Venue Name</label>
                    <input type="text" name="venue.name" value={formData.venue.name} onChange={handleChange} placeholder="Enter venue name" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Venue Address</label>
                      <input type="text" name="venue.address" value={formData.venue.address} onChange={handleChange} placeholder="Street address" />
                    </div>
                    <div className="form-group">
                      <label>City</label>
                      <input type="text" name="venue.city" value={formData.venue.city} onChange={handleChange} placeholder="City" />
                    </div>
                  </div>
                </div>

                {/* Invitation Message */}
                <div className="form-section">
                  <h2><FaQuoteLeft className="section-icon" /> Invitation Message</h2>
                  <div className="form-group">
                    <label>Invitation Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., John & Jane's Wedding" />
                  </div>
                  <div className="form-group">
                    <label>Description / Message</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="5" placeholder="Write your invitation message here..." />
                  </div>
                  <div className="form-group">
                    <label>RSVP Deadline</label>
                    <input type="date" name="rsvpDeadline" value={formData.rsvpDeadline} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Dress Code</label>
                    <input type="text" name="dressCode" value={formData.dressCode} onChange={handleChange} placeholder="e.g., Formal, Traditional, Beach Formal" />
                  </div>
                </div>

                {/* Theme & Colors */}
                <div className="form-section">
                  <h2><FaPalette className="section-icon" /> Theme & Colors</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Theme Style</label>
                      <select name="theme" value={formData.theme} onChange={handleChange}>
                        <option value="Romantic">Romantic</option>
                        <option value="Modern">Modern</option>
                        <option value="Traditional">Traditional</option>
                        <option value="Beach">Beach</option>
                        <option value="Garden">Garden</option>
                        <option value="Luxury">Luxury</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Primary Color</label>
                      <input type="color" name="customColors.primary" value={formData.customColors.primary} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Secondary Color</label>
                    <input type="color" name="customColors.secondary" value={formData.customColors.secondary} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" onClick={() => navigate('/dashboard')} className="cancel-btn">Cancel</button>
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? <FaSpinner className="spinning" /> : <FaSave />}
                    <span>{loading ? 'Creating...' : 'Create Invitation'}</span>
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'ai' && (
              <div className="ai-tab">
                <div className="ai-input-section">
                  <h2><FaRobot className="section-icon" /> Describe Your Wedding in Natural Language</h2>
                  <p className="section-desc">Write a story about your wedding including bride/groom names, date, time, venue, and theme. Our AI will extract details and create a beautiful invitation.</p>
                  
                  <div className="ai-form">
                    <div className="form-group">
                      <label>Tell us about your wedding</label>
                      <textarea value={storyInput} onChange={(e) => setStoryInput(e.target.value)} rows="6" placeholder='Example: "We are getting married! I am Priya and my fiance is Raj. Our wedding will be on December 15th, 2024 at 7 PM. The venue is The Grand Palace in Mumbai. We want a traditional Indian wedding."' className="story-textarea" />
                    </div>
                    <button onClick={generateFromStory} className="ai-generate-btn" disabled={aiLoadingStory}>
                      {aiLoadingStory ? <FaSpinner className="spinning" /> : <FaMagic />}
                      <span>{aiLoadingStory ? 'AI is analyzing...' : 'Generate Invitation from Story'}</span>
                    </button>
                  </div>
                </div>

                {showAIPanel && aiSuggestions && (
                  <div className="ai-suggestions-section">
                    <div className="suggestions-header">
                      <h3><FaStar /> AI Generated Invitation</h3>
                      <button onClick={() => setShowAIPanel(false)} className="close-suggestions">×</button>
                    </div>
                    <div className="suggestions-grid">
                      {aiSuggestions.invitation?.title && (
                        <div className="suggestion-card">
                          <h4>Suggested Title</h4>
                          <p>{aiSuggestions.invitation.title}</p>
                          <button onClick={() => applyAISuggestion('title', aiSuggestions.invitation.title)}>Use This</button>
                        </div>
                      )}
                      {aiSuggestions.invitation?.message && (
                        <div className="suggestion-card">
                          <h4>Invitation Message</h4>
                          <p>{aiSuggestions.invitation.message}</p>
                          <button onClick={() => applyAISuggestion('description', aiSuggestions.invitation.message)}>Use This</button>
                        </div>
                      )}
                      {aiSuggestions.invitation?.colors && (
                        <div className="suggestion-card">
                          <h4>Suggested Colors</h4>
                          <div className="color-palette">
                            {aiSuggestions.invitation.colors.map((color, idx) => (
                              <button key={idx} className="color-chip" style={{ backgroundColor: color }} onClick={() => applyAISuggestion('color', color)} title={`Use ${color}`} />
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="suggestion-card info-card">
                        <h4>📋 Extracted Information</h4>
                        <div className="extracted-info">
                          {formData.couple.bride && <p><strong>Bride:</strong> {formData.couple.bride}</p>}
                          {formData.couple.groom && <p><strong>Groom:</strong> {formData.couple.groom}</p>}
                          {formData.eventDate && <p><strong>Date:</strong> {formData.eventDate}</p>}
                          {formData.eventTime && <p><strong>Time:</strong> {formData.eventTime}</p>}
                          {formData.venue.name && <p><strong>Venue:</strong> {formData.venue.name}</p>}
                          {formData.theme && <p><strong>Theme:</strong> {formData.theme}</p>}
                        </div>
                      </div>
                    </div>
                    <button onClick={() => { setActiveTab('manual'); setShowAIPanel(false); }} className="continue-manual-btn">Review & Edit in Manual Mode →</button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        .create-invitation-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
        }
        
        .create-header {
          background: rgba(10, 10, 15, 0.95);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(10px);
        }
        
        .create-header-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .back-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .back-btn:hover { color: #FFD700; }
        
        .header-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .title-icon {
          color: #FF3366;
          font-size: 1.5rem;
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        .header-title h1 {
          color: white;
          font-size: 1.5rem;
          margin: 0;
        }
        
        .preview-toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255,215,0,0.2);
          border: 1px solid rgba(255,215,0,0.3);
          border-radius: 12px;
          color: #FFD700;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .preview-toggle-btn:hover {
          background: rgba(255,215,0,0.3);
        }
        
        .create-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }
        
        .tab-switcher {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          background: rgba(255,255,255,0.05);
          padding: 0.5rem;
          border-radius: 60px;
          width: fit-content;
        }
        
        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: transparent;
          border: none;
          border-radius: 50px;
          color: rgba(255,255,255,0.7);
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .tab-btn.active {
          background: linear-gradient(135deg, #FFD700, #FFA500);
          color: #0a0a0f;
        }
        
        .preview-section {
          background: rgba(255,255,255,0.05);
          border-radius: 24px;
          padding: 2rem;
          text-align: center;
        }
        
        .preview-header {
          margin-bottom: 2rem;
        }
        
        .preview-header h2 {
          color: white;
          margin-bottom: 0.5rem;
        }
        
        .preview-header p {
          color: rgba(255,255,255,0.5);
        }
        
        .manual-form {
          background: rgba(255,255,255,0.05);
          border-radius: 24px;
          padding: 2rem;
        }
        
        .form-section {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .form-section h2 {
          color: white;
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .section-icon { color: #FFD700; }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        .form-group {
          margin-bottom: 1rem;
        }
        
        .form-group label {
          display: block;
          color: rgba(255,255,255,0.8);
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }
        
        .form-group input, .form-group select, .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 12px;
          color: white;
          font-size: 0.875rem;
          transition: all 0.3s ease;
        }
        
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          outline: none;
          border-color: #FFD700;
          background: rgba(255,255,255,0.15);
        }
        
        .form-group input[type="color"] {
          height: 50px;
          padding: 5px;
        }
        
        .templates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
        }
        
        .template-option {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255,255,255,0.05);
          border: 2px solid transparent;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .template-option:hover {
          background: rgba(255,255,255,0.1);
          transform: translateX(5px);
        }
        
        .template-option.selected {
          border-color: #FFD700;
          background: rgba(255,215,0,0.1);
        }
        
        .template-option-icon {
          font-size: 2rem;
        }
        
        .template-option-info h4 {
          color: white;
          margin-bottom: 0.25rem;
        }
        
        .template-option-info p {
          color: rgba(255,255,255,0.5);
          font-size: 0.75rem;
        }
        
        .selected-badge {
          position: absolute;
          top: 8px;
          right: 12px;
          width: 24px;
          height: 24px;
          background: #FFD700;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0a0a0f;
          font-weight: bold;
        }
        
        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }
        
        .cancel-btn {
          padding: 0.75rem 1.5rem;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 12px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .cancel-btn:hover { background: rgba(255,255,255,0.2); }
        
        .submit-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #FFD700, #FFA500);
          border: none;
          border-radius: 12px;
          color: #0a0a0f;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255,215,0,0.3);
        }
        
        .ai-tab {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        
        .ai-input-section, .ai-suggestions-section {
          background: rgba(255,255,255,0.05);
          border-radius: 20px;
          padding: 1.5rem;
        }
        
        .ai-input-section h2 {
          color: white;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .section-desc {
          color: rgba(255,255,255,0.5);
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
        }
        
        .story-textarea {
          width: 100%;
          padding: 1rem;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 12px;
          color: white;
          font-size: 0.9rem;
          resize: vertical;
        }
        
        .ai-generate-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #FFD700, #FFA500);
          color: #0a0a0f;
          padding: 0.875rem;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 1rem;
          transition: all 0.3s ease;
        }
        
        .ai-generate-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255,215,0,0.3);
        }
        
        .suggestions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .suggestions-header h3 {
          color: white;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .close-suggestions {
          background: none;
          border: none;
          color: rgba(255,255,255,0.5);
          font-size: 1.5rem;
          cursor: pointer;
        }
        
        .suggestions-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-height: 500px;
          overflow-y: auto;
        }
        
        .suggestion-card {
          background: rgba(255,255,255,0.03);
          border-radius: 12px;
          padding: 1rem;
        }
        
        .suggestion-card h4 {
          color: #FFD700;
          font-size: 0.75rem;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        
        .suggestion-card p {
          color: rgba(255,255,255,0.8);
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
        }
        
        .suggestion-card button {
          background: rgba(255,215,0,0.2);
          border: 1px solid rgba(255,215,0,0.3);
          color: #FFD700;
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          font-size: 0.75rem;
          cursor: pointer;
        }
        
        .color-palette {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        
        .color-chip {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          border: 2px solid rgba(255,255,255,0.3);
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        
        .color-chip:hover { transform: scale(1.1); }
        
        .info-card {
          background: rgba(255,215,0,0.1);
          border: 1px solid rgba(255,215,0,0.2);
        }
        
        .extracted-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .extracted-info p {
          margin: 0;
          font-size: 0.85rem;
        }
        
        .extracted-info strong { color: #FFD700; }
        
        .continue-manual-btn {
          width: 100%;
          margin-top: 1rem;
          padding: 0.75rem;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 12px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .continue-manual-btn:hover {
          background: rgba(255,215,0,0.2);
          border-color: #FFD700;
        }
        
        .spinning { animation: spin 1s linear infinite; }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 968px) {
          .ai-tab { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
          .tab-switcher { width: 100%; justify-content: center; }
          .create-header-content { flex-direction: column; text-align: center; }
        }
        
        @media (max-width: 768px) {
          .create-content { padding: 1rem; }
          .manual-form, .ai-input-section, .ai-suggestions-section { padding: 1rem; }
          .form-actions { flex-direction: column; }
          .cancel-btn, .submit-btn { width: 100%; justify-content: center; }
          .templates-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default CreateInvitationPage;