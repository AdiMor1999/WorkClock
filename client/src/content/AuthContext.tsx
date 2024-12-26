// src/context/auth.tsx
import React, { createContext, useState, ReactNode } from "react";

// Define the types for the context
export interface AuthContextType {
  username: string | null;
  token: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
  setToken: (token: string) => void;
}

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// AuthProvider component to wrap your app and provide the context
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ username, token, setUsername, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
