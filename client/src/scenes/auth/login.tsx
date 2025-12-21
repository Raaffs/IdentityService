/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Stack,
  Box,
  TextField,
  Typography,
  Button,
  Avatar,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios"; // Your axios instance
import { btnstyle, textFieldSx } from "../../styles";

// Validation Schema
const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function Login() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setServerError(null); 
      try {
        const response = await api.post("/login", values);
        
        // Save token to localStorage as expected by your interceptor
        const { token } = response.data;
        localStorage.setItem("token", token);

        // Redirect to profile or dashboard
        navigate("/");
      } catch (err: any) {
        // Handle specific Go backend errors
        if (err.response) {
          const msg = err.response.data.error || "Login failed";
          setServerError(msg);
        } else {
          setServerError("Cannot connect to server");
        }
      }
    },
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", height: "100vh", padding: 2 }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          width: "100%",
          maxWidth: "1000px",
          height: { md: "600px" },
          overflow: "hidden",
        }}
      >
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: { xs: 4, md: 8 },
          }}
        >
          <Stack alignItems="flex-start" spacing={1} sx={{ mb: 4 }}>
            <Avatar
              sx={{
                bgcolor: "#FF6F61",
                color: "white",
                boxShadow: "0 4px 12px rgba(255, 111, 97, 0.4)",
                width: 48,
                height: 48,
                mb: 1,
              }}
            >
              <LockOutlinedIcon fontSize="medium" />
            </Avatar>
            <Typography variant="h4" fontWeight={600}>
              Log In
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Welcome back! Please enter your details.
            </Typography>
          </Stack>

          <Box display="flex" flexDirection="column" gap={3}>
            {/* Show Backend Error Alert */}
            {serverError && (
              <Alert severity="error" sx={{ borderRadius: "12px" }}>
                {serverError}
              </Alert>
            )}

            <TextField
              label="Email"
            variant="standard"
              fullWidth
              autoComplete="email"
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={textFieldSx}
            />

            <TextField
              label="Password"
              type="password"
              variant="standard"
              fullWidth
              autoComplete="current-password"
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={textFieldSx}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting}
              sx={{ borderRadius: "100px", py: 1.5, mt: 2 }}
              style={btnstyle}
            >
              {formik.isSubmitting ? "Logging in..." : "Log In"}
            </Button>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ color: "#555" }}>
                Don't have an account?{" "}
                <Typography
                  component="a"
                  href="/register"
                  sx={{
                    color: "#E94057",
                    fontWeight: 600,
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg, #FF6F61 0%, #E94057 100%)",
            borderRadius: "40px",
            color: "white",
            p: 6,
            textAlign: "center",
            boxShadow: "0 20px 40px rgba(233, 64, 87, 0.3)",
          }}
        >
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Welcome to the Platform
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: "300px" }}>
            Experience the next generation of profile management with our sleek
            and powerful dashboard.
          </Typography>
          <Box
            sx={{
              mt: 4,
              width: "100px",
              height: "4px",
              bgcolor: "white",
              borderRadius: "2px",
              opacity: 0.5,
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
}

export default Login;