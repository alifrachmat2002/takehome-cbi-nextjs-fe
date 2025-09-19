import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
import { useAddItem } from "./useAddItem";

export function AddItemDialog() {
    const { form, onSubmit, isLoading, error, itemSchema, open, setOpen } = useAddItem();
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add Item</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Add Item</DialogTitle>
                            <DialogDescription>
                                Add a new item to the list. Click save when
                                you're done.
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
                                <Button variant="outline" type="button" disabled={isLoading}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isLoading}>Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
