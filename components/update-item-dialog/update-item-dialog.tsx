import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ItemType } from "@/types/Item";
import { useEffect } from "react";
import { useUpdateItem } from "./useUpdateItem";


export function UpdateItemDialog({ updatedItem, setUpdatedItem }:{ updatedItem: ItemType | null, setUpdatedItem: (item: ItemType | null) => void }) {
    const { form, onSubmit, isLoading, error, itemSchema, open, setOpen } =
        useUpdateItem(updatedItem);

    const handleClose = (open: boolean) => {
        setOpen(open);
        setUpdatedItem(null);
    }

    useEffect(() => {
            if (updatedItem) {
                setOpen(true);
                form.setValue("name", updatedItem.name);
                form.setValue("price", updatedItem.price.toString());
            }
            if (!updatedItem) {
                setOpen(false);
            }
        }, [updatedItem]);

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Update Item</DialogTitle>
                            <DialogDescription>
                                Update the item details. Click save when
                                you&apos;re done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-2">
                            <div className="grid gap-3">
                                <FormField
                                    name="name"
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className={cn({
                                                        "border-destructive":
                                                            error,
                                                    })}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                    name="price"
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className={cn({
                                                        "border-destructive":
                                                            error,
                                                    })}
                                                    type="number"
                                                    placeholder="100.00"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    type="button"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isLoading}>
                                Save changes
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
