import React, { createContext, useState, useContext, useEffect } from 'react';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);


  useEffect(() => {
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("token=")
    );

    if (tokenCookie) {
      const token = tokenCookie.split("=")[1];
      setToken(token);
    }
  }, []);


  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
