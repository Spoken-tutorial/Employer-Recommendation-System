/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { isTokenExpired } from "../../utils/auth/tokenExpiryCheck";

function ProtectedRoute({ children, accessBy }) {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const refresh = localStorage.getItem("refresh");
    const access = localStorage.getItem("access");

    if (!refresh || !access) {
      navigate("/login");
    } else {
      const decoded = jwtDecode(refresh);
      const tokenExpired = isTokenExpired(decoded.exp);

      if (tokenExpired) {
        localStorage.clear();
        navigate("/login");
      } else {
        setAuthenticated(true);
      }
    }
  }, [navigate]);

  if (
    (accessBy === "auth" && authenticated) ||
    (accessBy === "unauth" && !authenticated)
  ) {
    return children;
  } else {

    navigate(accessBy === "auth" ? "/login" : "/loginDashboard");
    return null; 
  }
}

export default ProtectedRoute;
