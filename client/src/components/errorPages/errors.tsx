import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { btnstyle } from "../../styles";

interface ErrorPageProps {
  code: "404" | "500";
  message?: string;
}

const ErrorPage = ({ code, message }: ErrorPageProps) => {
  const navigate = useNavigate();
  const is404 = code === "404";

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        spacing={3}
        alignItems="center"
        sx={{
          p: 6,
          textAlign: "center",
          background: "white",
          borderRadius: "40px",
          maxWidth: "500px",
        }}
      >
        <Typography
          variant="h1"
          fontWeight={800}
          sx={{
            background: "linear-gradient(135deg, #FF6F61 0%, #E94057 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {code}
        </Typography>
        <Typography variant="h5" fontWeight={600}>
          {is404 ? "Page Not Found" : "Server Error"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {message || (is404 
            ? "The page you are looking for doesn't exist." 
            : "Oops! Something went wrong on our end. Failed to load data.")}
        </Typography>
        <Button
          variant="contained"
          sx={{ borderRadius: "100px", px: 4, py: 1.5 }}
          style={btnstyle}
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </Stack>
    </Box>
  );
};

export default ErrorPage;