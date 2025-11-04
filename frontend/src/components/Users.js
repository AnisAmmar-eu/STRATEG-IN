import React, { useEffect, useState } from "react";
import { Typography, Paper, Box, List, ListItem, ListItemText, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", pt: 10, backgroundColor: "#f3f6f9", height: "100vh" }}>
      <Paper elevation={4} sx={{ p: 4, width: 500, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="600" mb={2} textAlign="center">
          Liste des utilisateurs
        </Typography>
        <List>
          {users.map((u) => (
            <ListItem key={u._id} divider>
              <ListItemText primary={u.email} />
            </ListItem>
          ))}
        </List>
        <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={handleLogout}>
          Se déconnecter
        </Button>
      </Paper>
    </Box>
  );
}
