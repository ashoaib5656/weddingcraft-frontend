import { createContext } from "react";
import type { AuthResponse } from "../../Types/auth.types";

export type AuthContextType = {
    accessToken: string | null;
    role: string | null;
    userName: string | null;
    setAccessToken: (t: string | null) => void;
    setRole: (r: string | null) => void;
    setUserName: (n: string | null) => void;
    login: (email: string, password: string) => Promise<AuthResponse>;
    logout: () => Promise<void>;
    register: (email: string, password: string, phone: string) => Promise<AuthResponse>;
    isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
