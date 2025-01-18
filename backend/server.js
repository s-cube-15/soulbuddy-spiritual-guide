const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config(); // For loading environment variables

const app = express();
const port = 5000;

// Enable CORS for all origins or specify the frontend URL
app.use(cors()); // Allows all origins, can be restricted to frontend URL (e.g., http://localhost:3000)
app.use(express.json()); // Middleware to parse JSON bodies

// Proxy request to Langflow API
app.post("/api/query", async (req, res) => {
  const { query } = req.body; // Get the user query from the request body
  const baseURL = process.env.REACT_APP_LANGFLOW_BASE_URL;
  const applicationToken = process.env.REACT_APP_APPLICATION_TOKEN;

  const headers = {
    Authorization: `Bearer ${applicationToken}`,
    "Content-Type": "application/json",
  };

  const flowId = "18e3aaa5-0308-4dfb-8be7-bd2617083e79";
  const langflowId = "9280115a-6c59-4842-b2d8-f73e92489789";
  const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}`;
console.log(endpoint);

  try {
    // Make a POST request to the Langflow API
    const response = await axios.post(
      `${baseURL}${endpoint}`,
      {
        input_value: query,
        input_type: "chat",
        output_type: "chat",
        tweaks: {
          "ParseData-JyQEm": {},
          "AstraDBToolComponent-FpZr2": {},
          "Prompt-Z2UNF": {},
          "ChatInput-Pc3Pg": {},
          "Agent-XpC65": {},
          "ChatOutput-2asku": {},
        },
      },
      { headers }
    );

    // Return the response from Langflow API to the frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error making request to Langflow API:", error.message);
    res.status(500).json({ error: "Error occurred while fetching data." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
