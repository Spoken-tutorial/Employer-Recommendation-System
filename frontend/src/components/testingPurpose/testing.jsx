/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function LoginDashboard() {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const refresh = localStorage.getItem("refresh");

  useEffect(() => {
    if (!refresh) {
      navigate("/login");
    } else {
      const decoded = jwtDecode(refresh);
      setRoles(decoded.roles || []);
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h4>Roles Permitted</h4>
      {roles.map((obj, index) => (
        <h6 key={index}>{obj}</h6>
      ))}
      <button
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default LoginDashboard;
