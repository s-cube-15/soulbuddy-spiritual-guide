import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [query, setQuery] = useState(""); // Store user's query
  const [response, setResponse] = useState(""); // Store API response
  const [loading, setLoading] = useState(false); // Loading state to show while fetching

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from reloading the page
    setLoading(true); // Set loading to true while the API is being fetched
    
    try {
      // Send the query to the backend (Express server) for processing
      const res = await axios.post("http://localhost:5000/api/query", { query });
      
      // Update the response state with the data from backend
      setResponse(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("Error occurred while fetching data.");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Langflow Query</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows="5"
          cols="40"
          placeholder="Enter your query here..."
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      {response && (
        <div style={{ marginTop: "20px" }}>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
