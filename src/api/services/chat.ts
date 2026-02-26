import api from "../axios";
import endpoints from "../GlobalEndpoints";

export const CHAT_SERVICE = {
    GetHistory: async (page = 1, pageSize = 200) => {
        const response = await api.get(endpoints.ChatHistory, {
            params: { page, pageSize },
        });
        return response.data;
    },
};
