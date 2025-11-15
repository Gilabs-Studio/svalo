import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  userType: "INDIVIDUAL" | "BUSINESS";
  accountType: "SAVLO" | "SAVLO_PLUS";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Dummy users for prototype
const DUMMY_USERS = [
  {
    id: "1",
    email: "user@example.com",
    password: "password123",
    fullName: "John Doe",
    phoneNumber: "+6281234567890",
    userType: "INDIVIDUAL" as const,
    accountType: "SAVLO" as const,
  },
  {
    id: "2",
    email: "business@example.com",
    password: "password123",
    fullName: "Business Corp",
    phoneNumber: "+6281234567891",
    userType: "BUSINESS" as const,
    accountType: "SAVLO" as const,
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const user = DUMMY_USERS.find(
          (u) => u.email === email && u.password === password,
        );

        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({
            user: userWithoutPassword,
            isAuthenticated: true,
          });
          return true;
        }

        return false;
      },
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
