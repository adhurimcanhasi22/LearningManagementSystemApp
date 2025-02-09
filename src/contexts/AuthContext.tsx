// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Get additional user data from Firestore
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

      const userData: User = {
        id: firebaseUser.uid,
        name: userDoc.data()?.name || "",
        email: firebaseUser.email || "",
        role: userDoc.data()?.role || "student",
      };

      await AsyncStorage.setItem("userToken", await firebaseUser.getIdToken());
      setUser(userData);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userToken");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

        setUser({
          id: firebaseUser.uid,
          name: userDoc.data()?.name || "",
          email: firebaseUser.email || "",
          role: userDoc.data()?.role || "student",
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);
