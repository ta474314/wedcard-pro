const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate Wedding Invitation Content
const generateInvitation = async (userInput) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `You are a professional wedding invitation designer. Create a beautiful wedding invitation based on the following details:

Couple Names: ${userInput.brideName} & ${userInput.groomName}
Event Date: ${userInput.eventDate}
Event Time: ${userInput.eventTime}
Venue: ${userInput.venue}
Theme: ${userInput.theme || 'Romantic'}
Additional Details: ${userInput.details || 'Traditional wedding'}

Please generate a complete wedding invitation with:
1. A beautiful title
2. A romantic tagline
3. The main invitation message (2-3 lines)
4. A poetic closing line
5. 3-5 suggested color combinations (hex codes)
6. Suggested font pairing

Format the response as JSON with these keys: title, tagline, message, closing, colors, fonts`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    try {
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.log('JSON parse error, using text response');
    }
    
    // Fallback response
    return {
      title: `${userInput.brideName} & ${userInput.groomName}`,
      tagline: "Together with their families",
      message: `Request the pleasure of your company at their wedding celebration`,
      closing: "Your presence is our greatest gift",
      colors: ["#FF69B4", "#FFB6C1", "#FFD700", "#87CEEB", "#98FB98"],
      fonts: ["Playfair Display", "Great Vibes", "Montserrat"]
    };
    
  } catch (error) {
    console.error('AI Generation Error:', error);
    return getFallbackInvitation(userInput);
  }
};

// Fallback invitation template
const getFallbackInvitation = (userInput) => {
  return {
    title: `${userInput.brideName} & ${userInput.groomName}`,
    tagline: "Together with their families, request the honor of your presence",
    message: `We are overjoyed to invite you to celebrate our wedding as we begin our journey together. Join us for a day filled with love, laughter, and cherished memories.`,
    closing: "Your presence will make our day complete",
    colors: ["#FF69B4", "#FFB6C1", "#FFD700", "#87CEEB", "#98FB98"],
    fonts: ["Playfair Display", "Great Vibes", "Montserrat"]
  };
};

// Generate RSVP Questions
const generateRSVPQuestions = async (userInput) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Generate 5 RSVP questions for a wedding with ${userInput.guests} guests. Include questions about dietary preferences, song requests, and attendance confirmation. Return as JSON array.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (e) {}
    
    return [
      "Will you be attending?",
      "Any dietary restrictions?",
      "Song request for the reception?",
      "Number of guests attending?",
      "Any special accommodations needed?"
    ];
    
  } catch (error) {
    return [
      "Will you be attending?",
      "Any dietary restrictions?",
      "Song request for the reception?"
    ];
  }
};

// Generate Venue Suggestions
const generateVenueSuggestions = async (city, budget) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Suggest 5 wedding venues in ${city} with budget around ${budget}. Include name, capacity, price range, and key features. Return as JSON array.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (e) {}
    
    return [
      { name: "Grand Palace", capacity: 500, price: "₹50,000 - ₹1,00,000", features: "Waterfront view, Luxury rooms" },
      { name: "Royal Garden", capacity: 300, price: "₹30,000 - ₹70,000", features: "Garden setting, Pool access" }
    ];
    
  } catch (error) {
    return [];
  }
};

module.exports = {
  generateInvitation,
  generateRSVPQuestions,
  generateVenueSuggestions
};