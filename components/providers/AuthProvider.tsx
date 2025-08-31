"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "@/lib/api";
import { storeAccessToken, getAccessToken } from "@/lib/auth";

//define shape of use data
interface User {
  id: string;
  email: string;
  status: string;
}

//define shape of context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

//Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//AuthRPovide component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    //effect run once on initial app loads
    const initializeAuth = async () => {
      try {
        //check if a token is already in memmory
        const token = getAccessToken();
        if (token) {
          //if token exists, fetch user data
          await fetchUser();
        } else {
          await refreshToken();
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const fetchUser = async()=>{
    try {
        const {data} = await api.get('/me')
        setUser(data.user)
    } catch (error) {
        console.error("Failed to fetch user",error)
        setUser(null)
        storeAccessToken(''); // Clear invalid token
    }
  };

  const refreshToken = async () => {
    try {
      const {data} = await api.get('/auth/refresh')
      if(data.access_token){
        storeAccessToken(data.access_token)
        await fetchUser()
      }
    }catch(error){
      console.log("No active session")
      setUser(null)
    }
  }

  const login = async (token: string) => {
    try {
      storeAccessToken(token);
      await fetchUser();
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };
  const logout = () => {
    //implement /auth/logout later
    storeAccessToken('');
    setUser(null);
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading: loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context===undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
