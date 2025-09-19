import apiClient from "@/lib/axios"
import axios from "axios"
import endpoint from "./endpoint.constant"
import { ItemFormData } from "@/components/add-item-dialog/useAddItem"
import { ItemType } from "@/types/Item"

export default {
    getItems: async () => {
        const result = await apiClient.get(`/api/${endpoint.ITEMS}`)

        return result.data.data;
    },
    addItem: async (payload: Omit<ItemType, "id">) => {
        const result = await apiClient.post(`/api/${endpoint.ITEMS}`, payload)

        return result.data.data;
    },
    updateItem: async (id: string, payload: Omit<ItemType, "id">) => {
        const result = await apiClient.put(`/api/${endpoint.ITEMS}/${id}`, payload)

        return result.data.data;
    },
    deleteItem: async (itemId: string) => {
        const result = await apiClient.delete(`/api/${endpoint.ITEMS}/${itemId}`)

        return result.data.data;
    }
}