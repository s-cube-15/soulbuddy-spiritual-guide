require('dotenv').config();
const express = require('express');
const cassandra = require('cassandra-driver');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Enable CORS for your frontend
app.use(bodyParser.json()); // To parse JSON request bodies

// AstraDB connection details
const client = new cassandra.Client({
  cloud: {
    secureConnectBundle: process.env.SECURE_CONNECT_BUNDLE_PATH,
  },
  credentials: {
    username: process.env.ASTRA_DB_CLIENT_ID,
    password: process.env.ASTRA_DB_CLIENT_SECRET,
  },
  keyspace: process.env.KEYSPACE_NAME,
});

// Test connection to AstraDB
client.connect()
  .then(() => console.log("Connected to AstraDB"))
  .catch((err) => {
    console.error("Failed to connect to AstraDB", err);
    process.exit(1); // Exit process if connection fails
  });

// Create table for users
const createTable = `
  CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY,
    name TEXT,
    email TEXT,
    password TEXT
  );
`;

client.execute(createTable)
  .then(() => console.log("Users table created"))
  .catch((err) => console.error("Error creating table", err));

// Registration endpoint
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = 'INSERT INTO users (user_id, name, email, password) VALUES (uuid(), ?, ?, ?)';

  client.execute(query, [name, email, password], { prepare: true })
    .then(() => {
      res.status(201).json({ message: 'User registered successfully!' });
    })
    .catch((err) => {
      console.error('Error inserting user:', err);
      res.status(500).json({ error: 'Failed to register user' });
    });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
