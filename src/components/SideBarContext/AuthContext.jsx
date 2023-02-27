import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ screenWidth }}>
      {children}
    </AuthContext.Provider>
  );
};
