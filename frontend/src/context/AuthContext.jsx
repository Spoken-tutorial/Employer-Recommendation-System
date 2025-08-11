import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);

    useEffect(() => {
        console.log("******** auth provider ***********");
        const token = localStorage.getItem('token');
        if(token){
            try {
                const decoded = jwtDecode(token);
                setAuthData({
                    user_id: decoded.user_id,
                    group: decoded.group,
                    spk_usr_id: decoded.spk_usr_id
                });
            } catch (error) {
                console.log("Token decode failed", error);
            }
        }
    }, []);

    const login = (accessToken) => {
        localStorage.setItem('token', accessToken);
        const decoded = jwtDecode(accessToken);
        const newAuthData = {
            user_id: decoded.user_id,
            group: decoded.group,
            spk_usr_id: decoded.spk_usr_id
        };
        setAuthData(newAuthData);
        return newAuthData
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        setAuthData(null);
    };

    return (
        <AuthContext.Provider value={{ authData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

