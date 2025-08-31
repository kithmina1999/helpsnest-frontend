"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "@/lib/api";
import { storeAccessToken } from "@/lib/auth";

interface User {
  id: string;
  email: string;
  status: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        // On load, just try to fetch the user.
        // The API interceptor will handle refreshing the token if necessary.
        const { data } = await api.get("/me");
        setUser(data.user);
      } catch (error) {
        // If /me fails (even after a refresh attempt by the interceptor),
        // it means the user is not logged in.
        console.log("Initialization: No active session found.");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await api.get<{ user: User }>("/me");
      setUser(data.user);
      return data.user; // Return the user
    } catch (error) {
      console.error("Failed to fetch user", error);
      setUser(null);
      storeAccessToken("");
      throw error; // Re-throw the error so the caller knows it failed
    }
  };

  const login = async (token: string) => {
    storeAccessToken(token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // After login, fetch the user data
    try {
      await fetchUser();
    } catch (error) {
      console.error("Failed to fetch user after login", error);
      setUser(null);
    }
  };

  const logout = () => {
    // We will implement the backend /auth/logout endpoint later
    storeAccessToken("");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  // Render a loading state or null while checking auth status
  // This prevents a flash of unauthenticated content
  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
