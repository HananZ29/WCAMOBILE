const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes'); // Import routes from the index file in routes folder

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Use the routes defined in routes/index.js
app.use('/', routes);

app.listen(port,'0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
