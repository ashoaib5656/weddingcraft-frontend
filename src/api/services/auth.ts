// import api from "../axios";
// import endpoints from "../GlobalEndpoints"

import { UserRole } from "../../Types/auth.types";
import type { AuthResponse } from "../../Types/auth.types";
import { getRoleFromEmail } from "../../constants/roles";

const mockDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const AUTH_SERVICE = {
    login: async (payload: { email: string; password: string }): Promise<AuthResponse> => {
        // const response = await api.post(endpoints.SignIn, payload);
        // return response.data;
        console.log("Mock Login Call:", payload);
        await mockDelay(1000);

        // Determine role based on email prefix
        const role = getRoleFromEmail(payload.email);
        const name = `${role} User`;

        return {
            ok: true,
            message: "Login successful",
            accessToken: "mock-token-" + Date.now(),
            role: role,
            name: name,
            data: {
                email: payload.email,
                accessToken: "mock-token-" + Date.now(),
                role: role,
                name: name,
            },
        };
    },

    register: async (payload: {
        email: string;
        password: string;
        phoneNumber: string;
        role?: UserRole | string;
    }): Promise<AuthResponse> => {
        // const response = await api.post(endpoints.SignUp, payload);
        // return response.data;
        console.log("Mock Register Call:", payload);
        await mockDelay(1000);

        // Use provided role or determine from email
        const role = payload.role || getRoleFromEmail(payload.email);
        const name = `${role} User`;

        return {
            ok: true,
            message: "Registration successful",
            data: {
                accessToken: "mock-token-" + Date.now(),
                role: role,
                name: name,
            },
        };
    },

    logout: async () => {
        // const response = await api.post(endpoints.SignOut);
        // return response.data;
        await mockDelay(500);
        return { ok: true, message: "Logged out successfully" };
    },

    forgotPassword: async (payload: { email: string }): Promise<AuthResponse> => {
        // const response = await api.post(endpoints.ForgotPassword, payload);
        // return response.data;
        console.log("Mock ForgotPassword Call:", payload);
        await mockDelay(1000);
        return { ok: true, message: "OTP sent successfully", error: null };
    },

    resetPassword: async (payload: { email: string; password: string }): Promise<AuthResponse> => {
        // const token = localStorage.getItem("token");
        // const response = await api.post(endpoints.ResetPassword, payload, { headers: { Authorization: `Bearer ${token}` } });
        // return response.data;
        console.log("Mock ResetPassword Call:", payload);
        await mockDelay(1000);
        return { ok: true, message: "Password reset successful", error: null };
    },

    verifyToken: async (payload: { token: string }): Promise<AuthResponse> => {
        // const response = await api.post(endpoints.VerifyToken, payload);
        // return response.data;
        console.log("Mock VerifyToken Call:", payload);
        await mockDelay(500);
        return { ok: true, message: "Token verified" };
    },

    verifyOtp: async (payload: { email: string; otp: string }): Promise<AuthResponse> => {
        // const response = await api.post(endpoints.VerifyOtp, payload);
        // return response.data;
        console.log("Mock VerifyOtp Call:", payload);
        await mockDelay(1000);
        return { ok: true, message: "OTP verified", error: null };
    },
};