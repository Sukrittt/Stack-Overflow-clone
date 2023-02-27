// SidebarContext.js
import React, { createContext, useState } from "react";

export const SidebarContext = createContext({
  isOpen: false,
  toggleSidebar: () => {},
});

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const value = {
    isOpen,
    toggleSidebar,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
