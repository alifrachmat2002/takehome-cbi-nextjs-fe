import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import itemsService from "@/services/items.service";
import { useState } from "react";

// Zod schema for item form validation
const itemSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .min(3, "Name must be at least 3 characters"),
    price: z
        .string()
        .min(1, "Price is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number"),
});

// Type inference from Zod schema
export type ItemFormData = z.infer<typeof itemSchema>;

export function useAddItem() {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);

    // React Hook Form with Zod validation
    const form = useForm<ItemFormData>({
        resolver: zodResolver(itemSchema),
        defaultValues: {
            name: "",
            price: "",
        },
    });

    // Login mutation using React Query
    const addItemMutation = useMutation({
        mutationFn: async (data: ItemFormData) => {
            const payload = {
                ...data,
                price: parseFloat(data.price)
            }
            const result = await itemsService.addItem(payload);

            if (result?.error) {
                throw new Error("Invalid item data");
            }

            return result;
        },
        onSuccess: () => {
            console.log("Item added successfully!");
            toast.success("Item added successfully!");
            setOpen(false);
            queryClient.invalidateQueries({ queryKey: ["items"] });
        },
        onError: (error: Error) => {
            toast.error(`Item addition failed: ${error.message}` || "Item addition failed");
            console.error("Item addition failed:", error.message || "Item addition failed");
        },
    });

    // Form submission handler
    const onSubmit = (data: ItemFormData) => {
        addItemMutation.mutate(data);
    };

    return {
        form,
        onSubmit,
        isLoading: addItemMutation.isPending,
        error: addItemMutation.error,
        itemSchema,
        open,
        setOpen,
    };
}
