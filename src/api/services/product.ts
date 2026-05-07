import type { AxiosResponse } from "axios";
import type { Product } from "../../Types/Product";
import api from "../axios";
import endpoints from "../GlobalEndpoints";
import type { ApiResponse } from "./users";

export interface ProductService {
    GetAllProducts: () => Promise<AxiosResponse<ApiResponse<Product[]>>>;
    GetProductById: (id: string) => Promise<AxiosResponse<ApiResponse<Product>>>;
    GetMine: () => Promise<AxiosResponse<ApiResponse<Product[]>>>;
    CreateProduct: (data: any) => Promise<AxiosResponse<ApiResponse<Product>>>;
    UpdateProduct: (id: string, data: any) => Promise<AxiosResponse<ApiResponse<Product>>>;
    DeleteProduct: (id: string) => Promise<AxiosResponse<ApiResponse<any>>>;
}

const PRODUCT_SERVICE: ProductService = {
    GetAllProducts: async (): Promise<AxiosResponse<ApiResponse<Product[]>>> => {
        try {
            const response = await api.get(endpoints.Product)
            return response
        } catch (error) {
            console.log(error)
            throw error
        }

    },
    GetProductById: async (id: string): Promise<AxiosResponse<ApiResponse<Product>>> => {
        try {
            const response = await api.get(`${endpoints.Product}/${id}`)
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    GetMine: async (): Promise<AxiosResponse<ApiResponse<Product[]>>> => {
        try {
            const response = await api.get(`${endpoints.Product}/mine`)
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    CreateProduct: async (data: any): Promise<AxiosResponse<ApiResponse<Product>>> => {
        try {
            const response = await api.post(endpoints.Product, data)
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    UpdateProduct: async (id: string, data: any): Promise<AxiosResponse<ApiResponse<Product>>> => {
        try {
            const response = await api.put(`${endpoints.Product}/${id}`, data)
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    DeleteProduct: async (id: string): Promise<AxiosResponse<ApiResponse<any>>> => {
        try {
            const response = await api.delete(`${endpoints.Product}/${id}`)
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export default PRODUCT_SERVICE