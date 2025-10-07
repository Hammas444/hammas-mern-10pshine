import express from "express";
import sequelize from "./db.js";
import * as dotenv from 'dotenv' 
import User from "./models/User.js";
import Note from "./models/Note.js";
import noteRoutes from "./routes/noteRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors"

const app = express();
const PORT = 5000;
dotenv.config()
const port = process.env.PORT || 5000


// Middleware to parse JSON
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/notes", noteRoutes);
app.use("/auth", authRoutes);




// One user can have many notes
User.hasMany(Note, { foreignKey: "userId",onDelete: 'CASCADE' });
Note.belongsTo(User, { foreignKey: "userId" });

async function main() {
  try {
    await sequelize.sync({alter: true });
  } catch (error) {
    console.error("❌ Unable to sync database:", error);
  }
  console.log("✅ Database synced with User and Note tables");

}

main();

// Default route
app.get("/", (req, res) => {
  res.send("Hello, Express server is running!");
});


// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
