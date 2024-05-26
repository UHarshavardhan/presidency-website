const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST endpoint to receive form data and update Google Sheet
app.post('/submit-form', async (req, res) => {
  try {
    // Extract form data from request body
    const { fullName, email, phone, course } = req.body;

    // Data to be sent to Google Sheets API
    const requestData = {
      'Full Name': fullName,
      'Email': email,
      'Phone': phone,
      'Course': course
    };

    // Axios POST request configuration
    const config = {
      method: 'post',
      url: 'https://sheet.best/api/sheets/974dbd56-2f9e-4d86-9d81-a3a03b837e1c',
      headers: {
        'Content-Type': 'application/json'
      },
      data: requestData
    };

    // Send POST request using Axios to update Google Sheet
    const response = await axios(config);

    // Log Google Sheets API response
    console.log('Google Sheets API response:', response.data);

    // Send success response to frontend
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    // Log and send error response to frontend
    console.error('Error:', error);
    res.status(500).json({ error: 'Error submitting form' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
