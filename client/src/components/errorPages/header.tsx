import React from "react";
import { AppBar, Toolbar, Typography, Button, Stack, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const authPages = ["/login", "/register"];
  if (authPages.includes(location.pathname)) return null;

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        width: "100%", // Ensures it spans full width
        bgcolor: "white", 
        borderBottom: "1px solid #f0f0f0",
        color: "#2d3436",
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar 
        sx={{ 
          justifyContent: "space-between", 
          px: { xs: 2, md: 4 }, // Adds nice spacing at the edges
          minHeight: "70px"     // Slightly taller for a premium feel
        }}
      >
        {/* Logo / Brand */}
        <Stack 
          direction="row" 
          spacing={1.5} 
          alignItems="center" 
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/profile")}
        >
          <Box 
            sx={{ 
              width: 38, 
              height: 38, 
              bgcolor: "#E94057", 
              borderRadius: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.2rem",
              boxShadow: "0 4px 10px rgba(233, 64, 87, 0.3)"
            }}
          >
            P
          </Box>
          <Typography 
            variant="h6" 
            fontWeight={800} 
            sx={{ 
              letterSpacing: "-0.5px",
              display: { xs: "none", sm: "block" } // Hides text on tiny screens
            }}
          >
            <span style={{ color: "#E94057" }}>Profile Manager</span>
          </Typography>
        </Stack>

        {/* Actions */}
        <Stack direction="row" spacing={{ xs: 1, md: 3 }} alignItems="center">
          <Button
            startIcon={<AccountCircleIcon />}
            onClick={() => navigate("/profile")}
            sx={{ 
              color: location.pathname === "/profile" ? "#E94057" : "#636e72",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "1rem"
            }}
          >
            Profile
          </Button>
          
          <Button
            variant="contained"
            disableElevation
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ 
              borderRadius: "12px", 
              bgcolor: "#fff5f5",
              color: "#ff4757",
              textTransform: "none",
              fontWeight: 700,
              px: 3,
              "&:hover": { 
                bgcolor: "#fee2e2",
              }
            }}
          >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;