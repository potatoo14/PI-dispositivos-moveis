import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/game_database";

// ==========================================
// DATABASE SETUP
// ==========================================

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// The Save Schema (Tied to the Mongo auto-generated ObjectId)
const saveSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  gameState: { type: Object, required: true },
  lastSaved: { type: Date, default: Date.now },
});
const SaveGame = mongoose.model("SaveGame", saveSchema);

// ==========================================
// AUTH MIDDLEWARE (Validates the Token)
// ==========================================

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expects "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "No token provided." });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedData) => {
    if (err)
      return res.status(403).json({ error: "Invalid token. Access denied." });

    req.userId = decodedData.userId;
    next();
  });
};

// ==========================================
// ENDPOINTS
// ==========================================

app.post("/api/init-device", async (req, res) => {
  try {
    // Generate a completely random MongoDB ID to act as our "anonymous user"
    const newUserId = new mongoose.Types.ObjectId().toString();

    // Bake that ID into a signed JWT token
    // We do NOT set an expiration, so the save lasts as long as the app is installed
    const token = jwt.sign({ userId: newUserId }, JWT_SECRET);

    // Send it back so React Native can save it to AsyncStorage
    res.status(201).json({ message: "Device registered", token });
  } catch (error) {
    res.status(500).json({ error: "Failed to initialize device" });
  }
});

app.post("/api/save", authenticateToken, async (req, res) => {
  const { gameState } = req.body;
  const userId = req.userId;

  if (!gameState) {
    return res.status(400).json({ error: "Missing game state" });
  }

  try {
    await SaveGame.findOneAndUpdate(
      { userId },
      { gameState, lastSaved: Date.now() },
      { returnDocument: "after", upsert: true },
    );
    res.json({ message: "Game securely saved!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save game" });
  }
});

app.get("/api/load", authenticateToken, async (req, res) => {
  const userId = req.userId;

  try {
    const save = await SaveGame.findOne({ userId });

    if (save) {
      res.json({ gameState: save.gameState, lastSaved: save.lastSaved });
    } else {
      // It's normal for a new device to have a token but no save file yet
      res.status(404).json({ error: "No save file found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to load game" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
  console.log(`Silent Auth System Active.`);
});
