"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isPopupOpen,
        setIsPopupOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}