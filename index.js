const axios = require('axios');

// This is the main handler Vercel will run for ANY request to your URL.
module.exports = async (req, res) => {
  // Allow requests from any origin (CORS headers) for your Flutter app
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle pre-flight 'OPTIONS' requests from browsers
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // Get the 'city' from await axios.get(weatherURL);
    
    // Send the successful data back
    res.status(200).json(weatherResponse.data);

  } catch (error) {
    // If anything goes wrong, send back a detailed error
    const statusCode = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data.message : 'Internal Server Error';
    res.status(statusCode).json({ message: message });
  }
};
