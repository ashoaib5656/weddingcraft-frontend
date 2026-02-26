import api from "../axios";
import endpoints from "../GlobalEndpoints";

export interface AiDesignPayload {
    ProductType: string;
    Theme: string;
    ColorScheme: string;
    AdditionalDetails: string;
}

export const AI_SERVICE = {
    GetAiDesign: async (payload: AiDesignPayload) => {
        const response = await api.post(endpoints.AiDesign, payload);
        return response.data;
    },
};
