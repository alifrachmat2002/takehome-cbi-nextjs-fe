import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import itemsService from "@/services/items.service";

export function useDeleteItem() {
    const queryClient = useQueryClient();

    // Delete mutation using React Query
    const deleteItemMutation = useMutation({
        mutationFn: async (itemId: string) => {
            const result = await itemsService.deleteItem(itemId);

            if (result?.error) {
                throw new Error("Invalid item data");
            }

            return result;
        },
        onSuccess: () => {
            console.log("Item deleted successfully!");
            toast.success("Item deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["items"] });
        },
        onError: (error: Error) => {
            toast.error(
                `Item deletion failed: ${error.message}` ||
                    "Item deletion failed"
            );
            console.error(
                "Item deletion failed:",
                error.message || "Item deletion failed"
            );
        },
    });



    return {
        deleteItem: deleteItemMutation.mutate,
        isLoading: deleteItemMutation.isPending,
        error: deleteItemMutation.error,
        
    };
}
