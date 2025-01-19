require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const { DataAPIClient, DEFAULT_KEYSPACE } = require("@datastax/astra-db-ts");

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Enable CORS for your frontend
app.use(bodyParser.json()); // To parse JSON request bodies

// Initialize AstraDB client
const client = new DataAPIClient(process.env.ASTRA_DB_TOKEN);

// Get database (use your actual database ID and keyspace)
const db1 = client.db('https://f207942a-377f-41a0-bc96-1828e4950709-us-east-2.apps.astra.datastax.com', {keyspace: DEFAULT_KEYSPACE});

// Create the "users" collection (if not created)
async function createCollection() {
  try {
    await db1.createCollection("users"); // Create a collection for storing users
    console.log("Users collection created successfully");
  } catch (err) {
    console.error("Error creating collection:", err);
  }
}

// Create the collection when the server starts (if not exists)
createCollection();

// Registration endpoint to insert user data into AstraDB collection
app.post('/register', async (req, res) => {
  const { name, dob, time, gender, state, city } = req.body;

  // Validate input
  if (!name || !dob || !time || !gender || !state || !city) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Data to insert
  const userData = {
    name,
    dob,
    time,
    gender,
    state,
    city
  };

  try {
    // Insert user data into the "users" collection
    const coll = db1.collection("users");
    const response = await coll.insertOne(userData);
    
    // Send response back to the client
    res.status(201).json({ message: 'User registered successfully!', data: response });
  } catch (err) {
    console.error('Error inserting user:', err);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
