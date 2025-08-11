import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Paper } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { useTheme } from "@mui/material/styles";


export default function RegistrationSuccess() {
  const location = useLocation();
  const { email, companyName, is_draft } = location.state || {};
  const theme = useTheme();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!email || !companyName){
        navigate("/register", {replace: true});
    }
  }, [email, companyName, navigate]);

  if (!email || !companyName) return null; // Prevent rendering if redirecting

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <CheckCircleOutlineIcon
            sx={{ fontSize: 60, color: theme.palette.success.main, mb: 1 }}
          />
          <Typography variant="h5" color="primary" gutterBottom>
            Registration Successful!
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
          The company <strong>{companyName}</strong> has been registered.
          <br />
          Please verify your account by clicking the verification link sent to{" "}
          <strong>{email}</strong>.
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center" mt={3}>
          {is_draft ? (
            <>
              <DraftsOutlinedIcon
                sx={{ color: theme.palette.info.main, mr: 1 }}
              />
              <Typography variant="body2" color="info.main">
                Your job has been saved as a draft. You will be able to publish it after your account is verified.
              </Typography>
            </>
          ) : (
            <>
              <VerifiedUserOutlinedIcon
                sx={{ color: theme.palette.secondary.main, mr: 1 }}
              />
              <Typography variant="body2" color="secondary.main">
                Your job is saved as draft and will be posted once you complete verification and it is approved by the admin.
              </Typography>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
}