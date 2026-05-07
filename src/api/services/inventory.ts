import type { AxiosResponse } from "axios";
import api from "../axios";
import endpoints from "../GlobalEndpoints";

export interface InventoryItem {
    id: number;
    name: string;
    category: string;
    stock: number;
    price: number;
    status: string;
}

const INVENTORY_SERVICE = {
    GetAllInventoryItems: async (): Promise<AxiosResponse<InventoryItem[]>> => {
        try {
            const response = await api.get(endpoints.Inventory);
            return response;
        } catch (error) {
            console.error("Failed to fetch inventory", error);
            throw error;
        }
    }
};

export default INVENTORY_SERVICE;
