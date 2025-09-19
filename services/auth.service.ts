import apiClient from "@/lib/axios";
import endpoint from "./endpoint.constant";
import { ILogin } from "@/types/Auth";

const authServices = {
    login : (payload : ILogin) => {
        return apiClient.post(`${endpoint.LOGIN}`, payload);
    }
}

export default authServices;