import React, { useState, useEffect } from 'react';
import { FaTimes, FaArrowLeft, FaArrowRight, FaStar, FaCheckCircle, FaHeart } from 'react-icons/fa';

const TemplatePreviewModal = ({ template, onClose }) => {
  const [currentView, setCurrentView] = useState('preview'); // preview or details

  if (!template) return null;

  const TemplateComponent = template.component;

  // Sample data for preview
  const sampleData = {
    title: `${template.name} Sample`,
    couple: { bride: 'Jennifer', groom: 'Michael' },
    eventDate: '2025-06-15',
    eventTime: '6:00 PM',
    venue: { name: 'Grand Plaza', city: 'Mumbai' },
    description: 'Join us as we celebrate our love and begin our journey together. Your presence will make our day complete.',
    customColors: { primary: '#FF69B4', secondary: '#FFB6C1' }
  };

  return (
    <div className="preview-modal-overlay" onClick={onClose}>
      <div className="preview-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="preview-modal-header">
          <div className="preview-title">
            <h2>{template.name}</h2>
          </div>
          <button className="preview-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="preview-modal-tabs">
          <button 
            className={`preview-tab ${currentView === 'preview' ? 'active' : ''}`}
            onClick={() => setCurrentView('preview')}
          >
            Live Preview
          </button>
          <button 
            className={`preview-tab ${currentView === 'details' ? 'active' : ''}`}
            onClick={() => setCurrentView('details')}
          >
            Template Details
          </button>
        </div>

        <div className="preview-modal-body">
          {currentView === 'preview' && (
            <div className="preview-content">
              <div className="preview-sample">
                <div className="preview-sample-badge">Sample Preview</div>
                <TemplateComponent data={sampleData} colors={sampleData.customColors} />
              </div>
            </div>
          )}

          {currentView === 'details' && (
            <div className="preview-details">
              <div className="details-section">
                <h3>Template Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Template Name:</span>
                    <span className="detail-value">{template.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Style:</span>
                    <span className="detail-value">{template.style}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Price:</span>
                    <span className="detail-value price-badge">{template.price}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Rating:</span>
                    <span className="detail-value">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.floor(template.rating) ? 'star-filled' : 'star-empty'} />
                      ))}
                      <span className="rating-value">{template.rating}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h3>Description</h3>
                <p className="description-text">{template.description}</p>
              </div>

              <div className="details-section">
                <h3>Features</h3>
                <ul className="features-list">
                  {template.features.map((feature, idx) => (
                    <li key={idx}>
                      <FaCheckCircle className="feature-check" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="details-section">
                <h3>Why Choose This Template?</h3>
                <ul className="features-list">
                  <li><FaCheckCircle className="feature-check" /> Fully customizable design</li>
                  <li><FaCheckCircle className="feature-check" /> Mobile responsive layout</li>
                  <li><FaCheckCircle className="feature-check" /> QR code ready</li>
                  <li><FaCheckCircle className="feature-check" /> Printable version included</li>
                  <li><FaCheckCircle className="feature-check" /> 24/7 support</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="preview-modal-footer">
          <button className="preview-close-footer" onClick={onClose}>
            Close Preview
          </button>
          <button className="preview-use-btn">
            <FaHeart />
            Use This Template
          </button>
        </div>
      </div>

      <style jsx>{`
        .preview-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.9);
          backdrop-filter: blur(10px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .preview-modal-container {
          width: 90%;
          max-width: 900px;
          max-height: 85vh;
          background: linear-gradient(135deg, #1a1a2e, #0f0f1a);
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(255,215,0,0.2);
          box-shadow: 0 25px 50px rgba(0,0,0,0.5);
        }

        .preview-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          background: rgba(0,0,0,0.3);
        }

        .preview-title h2 {
          color: white;
          font-size: 1.3rem;
          margin: 0;
        }

        .preview-close-btn {
          background: rgba(255,255,255,0.1);
          border: none;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .preview-close-btn:hover {
          background: rgba(255,51,102,0.2);
          transform: rotate(90deg);
        }

        .preview-modal-tabs {
          display: flex;
          padding: 0 1.5rem;
          gap: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .preview-tab {
          background: none;
          border: none;
          padding: 0.8rem 1rem;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          position: relative;
        }

        .preview-tab.active {
          color: #FFD700;
        }

        .preview-tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: #FFD700;
        }

        .preview-modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
        }

        .preview-content {
          display: flex;
          justify-content: center;
        }

        .preview-sample {
          position: relative;
          max-width: 600px;
          width: 100%;
        }

        .preview-sample-badge {
          position: absolute;
          top: -10px;
          left: 10px;
          background: #FFD700;
          color: #0a0a0f;
          padding: 0.2rem 0.8rem;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
          z-index: 10;
        }

        .preview-details {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .details-section h3 {
          color: #FFD700;
          font-size: 1rem;
          margin-bottom: 1rem;
        }

        .details-grid {
          background: rgba(255,255,255,0.05);
          border-radius: 12px;
          padding: 1rem;
        }

        .detail-item {
          display: flex;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .detail-item:last-child {
          border-bottom: none;
        }

        .detail-label {
          width: 120px;
          color: rgba(255,255,255,0.6);
          font-size: 0.85rem;
        }

        .detail-value {
          flex: 1;
          color: white;
          font-size: 0.85rem;
        }

        .price-badge {
          background: linear-gradient(135deg, #FFD700, #FFA500);
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          color: #0a0a0f;
        }

        .star-filled {
          color: #FFD700;
          font-size: 0.7rem;
        }

        .star-empty {
          color: rgba(255,255,255,0.2);
          font-size: 0.7rem;
        }

        .rating-value {
          margin-left: 0.3rem;
          color: rgba(255,255,255,0.7);
          font-size: 0.8rem;
        }

        .description-text {
          color: rgba(255,255,255,0.7);
          line-height: 1.6;
          font-size: 0.9rem;
        }

        .features-list {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.8rem;
        }

        .features-list li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255,255,255,0.7);
          font-size: 0.85rem;
        }

        .feature-check {
          color: #10b981;
          font-size: 0.7rem;
        }

        .preview-modal-footer {
          display: flex;
          gap: 1rem;
          padding: 1rem 1.5rem 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .preview-close-footer {
          flex: 1;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 0.7rem;
          border-radius: 12px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .preview-close-footer:hover {
          background: rgba(255,255,255,0.15);
        }

        .preview-use-btn {
          flex: 1;
          background: linear-gradient(135deg, #FFD700, #FFA500);
          border: none;
          padding: 0.7rem;
          border-radius: 12px;
          color: #0a0a0f;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .preview-use-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255,215,0,0.3);
        }

        @media (max-width: 768px) {
          .preview-modal-container {
            width: 95%;
            max-height: 90vh;
          }
          
          .features-list {
            grid-template-columns: 1fr;
          }
          
          .detail-item {
            flex-direction: column;
          }
          
          .detail-label {
            width: 100%;
            margin-bottom: 0.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TemplatePreviewModal;