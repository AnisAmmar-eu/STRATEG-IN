import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/users");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de connexion");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center", backgroundColor: "#f3f6f9" }}>
      <Paper elevation={4} sx={{ p: 5, width: 400, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="600" textAlign="center" mb={2}>
          Connexion
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
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={handleLogin}>
          Se connecter
        </Button>
        <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate("/register")}>
          Créer un compte
        </Button>
      </Paper>
    </Box>
  );
}
