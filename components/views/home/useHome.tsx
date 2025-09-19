import itemsService from "@/services/items.service";
import { ItemType } from "@/types/Item";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useHome() {
    const [deletedItem, setDeletedItem] = useState<ItemType | null>(null);
    const [updatedItem, setUpdatedItem] = useState<ItemType | null>(null);
    const { data: items, isLoading, error, refetch, isRefetching } = useQuery<ItemType[]>({
        queryKey: ["items"],
        queryFn: () => itemsService.getItems(),
    })

    return { items, isLoading, error, refetch, isRefetching, deletedItem, setDeletedItem, updatedItem, setUpdatedItem };
}