import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protected";
import Login from "../scenes/auth/login";
import Register from "../scenes/auth/register";
import Profile from "../scenes/profile";
import ErrorPage from "../components/errorPages/errors";
import Header from "../components/global/header";
const AppRouter=()=> {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        {/* fallback to login for any other path */}
        <Route path="*" element={<ErrorPage code="404" />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;