import { useState, useEffect } from "react";
import { authService } from "@/services/api";

export interface User {
  id: string;
  email?: string;
  name?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (token exists)
    const token = authService.getToken();
    const userId = authService.getUserId();
    
    if (token && userId) {
      // User is logged in
      setUser({ id: userId });
    }
    
    setLoading(false);
  }, []);

  const signOut = async () => {
    authService.logout();
    setUser(null);
  };

  const isAuthenticated = !!user || authService.isAuthenticated();

  return { user, loading, signOut, isAuthenticated };
};
