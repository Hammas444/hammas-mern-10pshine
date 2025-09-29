const express = require("express");
const sequelize = require("./db");


const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());




// Default route
app.get("/", (req, res) => {
  res.send("Hello, Express server is running!");
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
