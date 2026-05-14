"use client";

import { useState, useCallback } from "react";
import type { User, UserRole } from "@/types";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
  role: UserRole;
}

interface AuthHook {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

/**
 * Hook for authentication state and actions.
 * Replace the mock implementations with real API calls.
 */
export function useAuth(): AuthHook {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async ({ email, password }: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      const mockUser: User = {
        id: "u_001",
        name: "Sarah Johnson",
        email,
        role: email.includes("teacher") ? "teacher" : "student",
        createdAt: new Date().toISOString(),
      };
      void password; // suppress unused warning until real auth is wired
      setUser(mockUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async ({ email, password, name, role }: RegisterCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      const mockUser: User = {
        id: `u_${Date.now()}`,
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
      };
      void password;
      setUser(mockUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    // TODO: clear tokens / session
  }, []);

  return { user, isLoading, error, login, register, logout };
}
