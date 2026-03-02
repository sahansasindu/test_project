const express = require("express");
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Port
const PORT = 3001;

// Test route
app.get("/", (req, res) => {
  res.status(200).send("Express server is running 246810🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
