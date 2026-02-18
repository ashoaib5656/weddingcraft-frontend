import { UserRole as UserRoleType } from "../Types/auth.types";

export const UserRole = {
    ADMIN: "Admin",
    MANAGER: "Manager",
    STAFF: "Staff",
    VENDOR: "Vendor",
    CLIENT: "Client",
} as const;

export const ROLE_DASHBOARD_MAP: Record<UserRoleType, string> = {
    [UserRole.ADMIN]: "/admin-dashboard",
    [UserRole.MANAGER]: "/manager-dashboard",
    [UserRole.STAFF]: "/staff-dashboard",
    [UserRole.VENDOR]: "/vendor-dashboard",
    [UserRole.CLIENT]: "/client-dashboard",
};

export const ROLE_LABELS: Record<UserRoleType, string> = {
    [UserRole.ADMIN]: "Administrator",
    [UserRole.MANAGER]: "Manager",
    [UserRole.STAFF]: "Staff Member",
    [UserRole.VENDOR]: "Vendor",
    [UserRole.CLIENT]: "Client",
};

export const ALL_ROLES = Object.values(UserRole);

// Helper function to get dashboard path by role
export const getDashboardPath = (role: UserRoleType | string): string => {
    return ROLE_DASHBOARD_MAP[role as UserRoleType] || "/client-dashboard";
};

// Helper function to extract role from email (for mock authentication)
export const getRoleFromEmail = (email: string): UserRoleType => {
    const emailLower = email.toLowerCase();
    if (emailLower.startsWith("admin")) return UserRole.ADMIN as UserRoleType;
    if (emailLower.startsWith("manager")) return UserRole.MANAGER as UserRoleType;
    if (emailLower.startsWith("staff")) return UserRole.STAFF as UserRoleType;
    if (emailLower.startsWith("vendor")) return UserRole.VENDOR as UserRoleType;
    return UserRole.CLIENT as UserRoleType; // Default role
};
