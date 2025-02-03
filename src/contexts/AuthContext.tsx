// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define user type
interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher";
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        if (token) {
          // In real app, you would verify token and fetch user data from API
          // For mock implementation, decode token or use mock user
          const mockUser: User = {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            role: token.includes("teacher") ? "teacher" : "student",
          };
          setUser(mockUser);
        }
      } catch (error) {
        console.error("Error checking auth state:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      const mockResponse = await new Promise<{ token: string; user: User }>(
        (resolve) =>
          setTimeout(
            () =>
              resolve({
                token: `fake-jwt-token-${
                  email.includes("@teacher") ? "teacher" : "student"
                }`,
                user: {
                  id: "1",
                  name: email.split("@")[0],
                  email,
                  role: email.includes("@teacher") ? "teacher" : "student",
                },
              }),
            1000
          )
      );

      // Store token and user data
      await AsyncStorage.setItem("userToken", mockResponse.token);
      setUser(mockResponse.user);
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed. Please check your credentials.");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);
