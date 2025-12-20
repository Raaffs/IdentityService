/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Stack,
  Box,
  TextField,
  Typography,
  Button,
  Avatar,
  Alert,
  CircularProgress
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { btnstyle, textFieldSx } from "../../styles";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[@$!%*?&#]/, "Password must contain at least one special character")
    .required("Password is required"),
});

function Register() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setServerError(null);
      try {
        // Calling your POST /api/register endpoint
        await api.post("register", values);
        
        // Success: Redirect to login page
        navigate("/login", { state: { message: "Account created! Please log in." } });
      } catch (err: any) {
        // Handle validation errors or duplicate user errors from Go
        const errorMsg = err.response?.data?.error || "Registration failed. Try again.";
        setServerError(errorMsg);
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
              Register
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create a new account! Please enter your details.
            </Typography>
          </Stack>

          <Box display="flex" flexDirection="column" gap={3}>
            {serverError && (
              <Alert severity="error" sx={{ borderRadius: "12px" }}>
                {serverError}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Username"
              variant="standard"
              sx={textFieldSx}
              {...formik.getFieldProps("username")}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />

            <TextField
              fullWidth
              label="Email"
              variant="standard"
              sx={textFieldSx}
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="standard"
              sx={textFieldSx}
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting}
              sx={{ borderRadius: "100px", py: 1.5, mt: 2 }}
              style={btnstyle}
            >
              {formik.isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
            </Button>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ color: "#555" }}>
                Already have an account?{" "}
                <Typography
                  component="a"
                  href="/login"
                  sx={{
                    color: "#E94057",
                    fontWeight: 600,
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                    cursor: "pointer",
                  }}
                >
                  login
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

export default Register;