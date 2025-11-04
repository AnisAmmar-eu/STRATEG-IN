import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connecté"))
  .catch((err) => console.error("Erreur MongoDB :", err));

app.get("/", (req, res) => {
  res.send("API Strateg.in opérationnelle ");
});

app.use("/api", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Serveur lancé sur le port ${PORT}`));
