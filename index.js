// server/index.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows our Flutter app to call this server
app.use(express.json());

// The Weather Endpoint
app.get('/weather', async (req, res) => {
  try {
    const city = req.query.city;
    if (!city) {
      return res.status(400).json({ message: 'City parameter is required' });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    const response = await axios.get(weatherURL);
    
    // Send the weather data back to the Flutter app
    res.status(200).json(response.data);

  } catch (error) {
    console.error("Error fetching weather:", error.response ? error.response.data : error.message);
    const statusCode = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data.message : 'Internal Server Error';
    res.status(statusCode).json({ message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Weather server is running on port ${PORT}`);
});