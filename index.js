// index.js (Final Vercel Version - Simple and Correct)

const axios = require('axios');

// This is the main function that Vercel will run for every request to your URL.
module.exports = async (req, res) => {
  // Set CORS headers to allow your Flutter app to make requests from any origin.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Vercel requires handling a "pre-flight" OPTIONS request.
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // Get the 'city' from the URL's query, for example: .../?city=bapatla
    const { city } = req.query; 

    // If no city is provided, send a clear error.
    if (!city) {
      return res.status(400).json({ message: 'City parameter is required' });
    }

    // This gets the API key you stored securely in the Vercel dashboard.
    const apiKey = process.env.OPENWEATHER_API_KEY; 

    // Check if the API key was set correctly in Vercel.
    if (!apiKey) {
      return res.status(500).json({ message: 'Server configuration error: API key is missing.' });
    }

    // Construct the full URL to call the OpenWeatherMap API.
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    // Make the request to OpenWeatherMap.
    const weatherResponse = await axios.get(weatherURL);
    
    // If successful, send the weather data back to your Flutter app.
    res.status(200).json(weatherResponse.data);

  } catch (error) {
    // If any error occurs, send back a detailed error message.
    const statusCode = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data.message : 'Internal Server Error';
    res.status(statusCode).json({ message: message });
  }
};
