import React, { createContext, useContext, useState } from "react";

interface User {
  id: string;

  name: string;

  role: "student" | "teacher";
}

interface AuthContextType {
  user: User | null;

  login: (email: string, password: string) => void;

  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Temporary mock authentication

    setUser({
      id: "1",

      name: "John Doe",

      role: email.includes("@teacher") ? "teacher" : "student",
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
