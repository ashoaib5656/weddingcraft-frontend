import api from "../axios";
import endpoints from "../GlobalEndpoints"
import type { UserRole, AuthResponse } from "../../Types/auth.types";

export const AUTH_SERVICE = {
    login: async (payload: { email: string; password: string }): Promise<AuthResponse> => {
        const response = await api.post(endpoints.SignIn, payload);
        return response.data;
    },

    register: async (payload: {
        email: string;
        password: string;
        phoneNumber: string;
        role?: UserRole | string;
    }): Promise<AuthResponse> => {
        const response = await api.post(endpoints.SignUp, payload);
        return response.data;
    },

    logout: async () => {
        const response = await api.post(endpoints.SignOut);
        return response.data;
    },

    refresh: async (refreshToken: string): Promise<AuthResponse> => {
        const response = await api.post(endpoints.Refresh, { refreshToken });
        return response.data;
    },

    revoke: async (refreshToken: string): Promise<void> => {
        await api.post(endpoints.Revoke, { refreshToken });
    },

    forgotPassword: async (payload: { email: string }): Promise<AuthResponse> => {
        const response = await api.post(endpoints.ForgotPassword, payload);
        return response.data;
    },

    resetPassword: async (payload: { email: string; newPassword: string }): Promise<AuthResponse> => {
        const response = await api.post(endpoints.ResetPassword, payload);
        return response.data;
    },

    verifyToken: async (payload: { token: string }): Promise<AuthResponse> => {
        const response = await api.post(endpoints.VerifyToken, payload);
        return response.data;
    },

    verifyOtp: async (payload: { email: string; otp: string }): Promise<AuthResponse> => {
        const response = await api.post(endpoints.VerifyOtp, payload);
        return response.data;
    },
};

