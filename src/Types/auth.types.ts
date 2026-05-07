export const UserRole = {
    ADMIN: "Admin",
    MANAGER: "Manager",
    STAFF: "Staff",
    VENDOR: "Vendor",
    CLIENT: "Customer",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    phoneNumber?: string;
    createdAt?: string;
}

export interface AuthPayload {
    accessToken: string;
    refreshToken: string;
    role: UserRole;
    name: string;
    email: string;
    expiresIn: number; // in seconds
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data?: AuthPayload | null;
    error?: string | null;
}
