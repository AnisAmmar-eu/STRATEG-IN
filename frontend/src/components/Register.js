import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await api.post("/register", { email, password });
      setMessage("Compte créé avec succès !");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center", backgroundColor: "#f3f6f9" }}>
      <Paper elevation={4} sx={{ p: 5, width: 400, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="600" textAlign="center" mb={2}>
          Inscription
        </Typography>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Mot de passe"
          fullWidth
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {message && (
          <Typography color="primary" variant="body2" sx={{ mt: 1 }}>
            {message}
          </Typography>
        )}
        <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={handleRegister}>
          S'inscrire
        </Button>
        <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate("/login")}>
          Déjà un compte ?
        </Button>
      </Paper>
    </Box>
  );
}
