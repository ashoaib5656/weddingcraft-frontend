import type { AxiosResponse } from "axios";
import api from "../axios";
import endpoints from "../GlobalEndpoints";
import type { User, ApiResponse } from "./users";

export interface OrderItem {
    id: number;
    productId: number;
    quantity: number;
    price: number;
    customizationJson?: string;
}

export interface Order {
    id: number | string;
    userId: string;
    user?: User;
    vendorId?: string;
    title: string;
    createdAt: string;
    totalAmount: number;
    status: string;
    items?: OrderItem[];
}

const ORDER_SERVICE = {
    GetAllOrders: async (): Promise<AxiosResponse<ApiResponse<Order[]>>> => {
        try {
            const response = await api.get(endpoints.Orders);
            return response;
        } catch (error) {
            console.error("Failed to fetch orders", error);
            throw error;
        }
    }
};

export default ORDER_SERVICE;
