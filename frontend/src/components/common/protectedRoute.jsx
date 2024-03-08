/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { isTokenExpired } from "../../utils/auth/tokenExpiryCheck";

function ProtectedRoute({ children, accessBy, roleAllowed }) {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [roleAccessAllowed, setRoleAccessAllowed] = useState(false);

  useEffect(() => {
    const refresh = localStorage.getItem("refresh");
    const access = localStorage.getItem("access");

    if (!refresh || !access) {
      localStorage.clear();
      navigate("/login");
    } else {
      const decoded = jwtDecode(refresh);
      const tokenExpired = isTokenExpired(decoded.exp);
      setRole(decoded.roles[0]);
      if (tokenExpired) {
        localStorage.clear();
        navigate("/login");
      } else {
        setAuthenticated(true);
        if (roleAllowed != null) {
          setRoleAccessAllowed(roleAllowed.includes(decoded.roles[0]));
        } else {
          setRoleAccessAllowed(true);
        }
      }
    }
  }, [navigate]);

  if (
    (accessBy === "auth" && authenticated && roleAccessAllowed) ||
    (accessBy === "unauth" && !authenticated)
  ) {
    return children;
  } else {
    navigate(
      accessBy === "auth"
        ? "/login"
        : "/auth/" + role.toLowerCase() + "/dashboard"
    );
    return null;
  }
}
export default ProtectedRoute;
