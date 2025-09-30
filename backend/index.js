import express from "express";
import sequelize from "./db.js";
import User from "./models/User.js";
import Note from "./models/Note.js";
import noteRoutes from "./routes/noteRoutes.js";

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());
app.use("/notes", noteRoutes);





async function main() {
  await sequelize.sync({ force: true }); 
  console.log("✅ Database synced with User and Note tables");

}

main();

// Default route
app.get("/", (req, res) => {
  res.send("Hello, Express server is running!");
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
