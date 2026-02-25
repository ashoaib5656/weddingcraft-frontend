import type { AxiosResponse } from "axios";
import type { Product } from "../../Types/Product";
import api from "../axios";
import endpoints from "../GlobalEndpoints";

const PRODUCT_SERVICE = {
    GetAllProducts: async (): Promise<AxiosResponse<Product[]>> => {
        try {
            const response = await api.get(endpoints.Products)
            return response
        } catch (error) {
            console.log(error)
            throw error
        }

    },
    GetProductById: async (id: string): Promise<AxiosResponse<Product>> => {
        try {
            const response = await api.get(`${endpoints.Products}/${id}`)
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export default PRODUCT_SERVICE