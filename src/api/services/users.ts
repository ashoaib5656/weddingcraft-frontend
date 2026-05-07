import type { AxiosResponse } from "axios";
import api from "../axios";
import endpoints from "../GlobalEndpoints";

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message: string;
    pageNumber?: number;
    pageSize?: number;
    totalRecords?: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    phoneNumber?: string;
    status?: string;
    category?: string;
    department?: string;
    createdAt?: string;
    lastSeen?: string;
    location?: string;
    vendorProfile?: {
        description?: string;
        imageUrl?: string;
        priceRange?: string;
        businessName?: string;
    };
    products?: any[];
}

const USER_SERVICE = {
    GetAllUsers: async (): Promise<AxiosResponse<ApiResponse<User[]>>> => {
        try {
            const response = await api.get(endpoints.Users);
            return response;
        } catch (error) {
            console.error("Failed to fetch users", error);
            throw error;
        }
    },
    GetUserById: async (id: string): Promise<AxiosResponse<ApiResponse<User>>> => {
        try {
            const response = await api.get(`${endpoints.Users}/${id}`);
            return response;
        } catch (error) {
            console.error("Failed to fetch user by id", error);
            throw error;
        }
    },
    GetProfile: async (): Promise<AxiosResponse<ApiResponse<User>>> => {
        try {
            const response = await api.get(endpoints.UserProfile);
            return response;
        } catch (error) {
            console.error("Failed to fetch profile", error);
            throw error;
        }
    },
    UpdateProfile: async (data: any): Promise<AxiosResponse<ApiResponse<any>>> => {
        try {
            const response = await api.put(endpoints.UserProfile, data);
            return response;
        } catch (error) {
            console.error("Failed to update profile", error);
            throw error;
        }
    }
};

export default USER_SERVICE;
