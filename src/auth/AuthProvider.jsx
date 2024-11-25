import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  user: null,
  handleLogin: (token) => {},
  handleLogout: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (token) => {
    const decodedToken = jwtDecode(token);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", decodedToken.userId);
    localStorage.setItem("username", decodedToken.sub);
    localStorage.setItem("userRole", decodedToken.roles);
    localStorage.setItem("expSession", decodedToken.exp);
    

    setUser(decodedToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    localStorage.removeItem("expSession");
    localStorage.removeItem("curentDate");

    setUser(null);
  };

  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  };


  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (isTokenExpired(token)) {
        localStorage.removeItem('token');
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("userRole");
        localStorage.removeItem("expSession");
        localStorage.removeItem("curentDate");
        navigate("/login", { state: { message: " You have been logged out!" } });
      } 
    //   else {
    //     setUser(JSON.parse(localStorage.getItem('user')));
    //   }
    } else {
        navigate("/login", { state: { message: " You have been logged out!" } });
    }
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
