import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ItemType } from "@/types/Item";
import { useEffect, useState } from "react";
import { useDeleteItem } from "./useDeleteItem";

export function DeleteItemDialog({ deletedItem }:{ deletedItem: ItemType | null }) {
    const [open, setOpen] = useState(false);
    const { deleteItem, isLoading, error } = useDeleteItem();

    useEffect(() => {
        if (deletedItem) {
            setOpen(true);
        }
        if (!deletedItem) {
            setOpen(false);
        }
    }, [deletedItem]);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete the item {deletedItem?.name}.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteItem(`${deletedItem?.id}`)} disabled={isLoading}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
