import React, {createContext, useContext, useState, useEffect} from "react";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('access');
        if(accessToken){
            try {
                const decodedToken = jwtDecode(accessToken);
                console.log("Decoded Token");
                console.log(decodedToken);
                setAuthData(decodedToken);
            } catch (error) {
                console.error('Failed to decode token:', error);
                setAuthData(null);
            }
        }
    }, []);

    const updateAuthData = (tokens) => {
        try {
            const decodedToken = jwtDecode(tokens.access);
            setAuthData(decodedToken);
            localStorage.setItem('access', tokens.access);
            localStorage.setItem('refresh', tokens.refresh);
        } catch (error) {
            console.error('Failed to decode token:', error);
            setAuthData(null);
        }

    }

    return (
        <AuthContext.Provider value={{authData, updateAuthData}}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => {
    return useContext(AuthContext);
}