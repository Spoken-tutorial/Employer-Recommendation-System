import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const useToken = () => {
  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access");

    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        setTokenData(decoded);
      } catch (error) {
        console.error("Failed to decode token", error);
        // Handle error, possibly clear localStorage and redirect to login
      }
    }
  }, []);

  return tokenData;
};

export default useToken;
