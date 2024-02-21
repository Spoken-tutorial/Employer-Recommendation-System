/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function LoginDashboard() {
  const params = useParams();
  const [roles, setRoles] = useState("");
  const navigate = useNavigate();
  const refresh = localStorage.getItem("refresh");

  useEffect(() => {
    if (!refresh) {
      navigate("/login");
    } else {
      let { role } = params;
      console.log(role);
      setRoles(role);
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h4>Roles Permitted</h4>
      {roles}
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
