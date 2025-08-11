import React, { useEffect, useState } from "react";
import { Container, Paper, Box, Typography, TextField, Button, InputAdornment, IconButton, Alert, AlertTitle, Link, CircularProgress} from '@mui/material';
import { Visibility, VisibilityOff, EmailOutlined, Password } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";


export default function  Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: saveAuthData } = useAuth(); // rename to avoid clash


  useEffect(() => {
    console.log("calling useeffect");
    const token = localStorage.getItem('token');
    console.log(token);
    if(token){
      try {
        const payload = jwtDecode(token);
        console.log("payload ****")
        console.log(payload);
        if (payload.group){
            navigate(`/${payload.group}/dashboard`, {replace: true})
        }
      } catch (error) {
        
      }
    }
  }, [navigate]);

//   controls disable property of login button
  const isValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && password.length !== 0;
  };


  // const fakeLoginAPI = (email, password) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (email === "student@gmail.com") resolve({ user_id: 1, group: 'student' });
  //       else if (email === "employer@gmail.com") resolve({ user_id: 2, group: 'employer' });
  //       else if (email === "admin@gmail.com") resolve({ user_id: 3, group: 'admin' });
  //       else reject(new Error('Invalid credentials'));
  //     }, 1500);
  //   });
  // };

  async function login() {
    console.log("inside login");
    
    try {
      const payload = {username: email, password};
      console.log(`payload : ${payload}`)
      const res = await axiosInstance.post('common/token/', payload);
      const data = res.data;
      console.log("data");
      console.log(data);

      const authPayload = saveAuthData(data.access);
      localStorage.setItem('refresh_token', data.refresh);

      if(authPayload.group){
        navigate(`/${authPayload.group}/dashboard`, { replace: true });
      }


      // localStorage.setItem('token', data.access);
      // localStorage.setItem('refresh_token', data.refresh);
      // const jwtPayload = jwtDecode(data.access);
      // if(jwtPayload.group) navigate(`${jwtPayload.group}/dashboard`)
      // if(jwtPayload.group) navigate(`/${jwtPayload.group}/dashboard`, {replace: true})
    } catch (error) {
      console.log("error");
      console.log(error);
      // setError(error.mes;)
    } finally {
      setLoading(false);
    }
    
  }

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    login();
    // try {
    //   const res = await fakeLoginAPI(email, password);
    //   setTimeout(() => {
    //     if (res.group === 'student') navigate('/student/dashboard');
    //     else if (res.group === 'employer') navigate('/employer/dashboard');
    //     else if (res.group === 'admin') navigate('/admin/dashboard');
    //   }, 800);
    // } catch (error) {
    //   setError(error.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 6 }}>
        <Alert variant="outlined" severity="info"
          sx={{ mb: 3, borderLeft: '6px solid #004687', bgcolor: '#f0f7ff' }}>
          <AlertTitle>
            <Typography variant="subtitle1" fontWeight="bold">
              Note for Spoken Tutorial Students
            </Typography>
          </AlertTitle>
          <Typography variant="body2">
            Please log in with the <strong>email</strong> and <strong>password</strong> you used to sign up on the Spoken Tutorial website.
          </Typography>
        </Alert>

        <Typography variant="subtitle1"  fontWeight="bold" color="primary" gutterBottom>
          Login to Your Account
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* Email */}
        <TextField
          label="Email"
          fullWidth
          size="small"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlined />
              </InputAdornment>
            )
          }}
        />

        {/* Password */}
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          size="small"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Password />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        {/* Login button */}
        <Box sx={{ mt: 3, position: 'relative' }}>
          <Button
            variant="contained"
            fullWidth
            disabled={!isValid() || loading}
            onClick={handleLogin}
            size="medium"
          >
            Login
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px'
              }}
            />
          )}
        </Box>

        {/* Help Links */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Forgot Password?{' '}
            <Link
              href="https://spoken-tutorial.org/accounts/forgot-password/"
              target="_blank"
              rel="noopener"
              underline="hover"
            >
              Proceed to Spoken Tutorial
            </Link>
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Need help?{' '}
            <Link
              href="https://process.spoken-tutorial.org/index.php/Software-Training#Contacts_For_Training"
              target="_blank"
              rel="noopener"
              underline="hover"
            >
              Contact your training manager
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
