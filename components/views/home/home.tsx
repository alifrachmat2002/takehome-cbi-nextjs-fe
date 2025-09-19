"use client";
import { Button } from "@/components/ui/button";
import useHome from "./useHome";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { AddItemDialog } from "@/components/add-item-dialog/add-item-dialog";
import { DeleteItemDialog } from "@/components/delete-item-dialog/delete-item-dialog";
import { UpdateItemDialog } from "@/components/update-item-dialog/update-item-dialog";

export default function HomePage() {
    const { items, isLoading, error, refetch, isRefetching, deletedItem, setDeletedItem, updatedItem, setUpdatedItem } = useHome();

    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push("/login");
    };

    return (
        <div className="min-h-screen p-6 gap-16 sm:p-10 space-y-5">
            <div className="w-full flex justify-between items-center mb-4">
                <h1 className="text-4xl font-bold">List of Items</h1>
                <Button onClick={handleSignOut}>Sign Out</Button>
            </div>
            <AddItemDialog/>
            <DeleteItemDialog deletedItem={deletedItem} />
            <UpdateItemDialog updatedItem={updatedItem} setUpdatedItem={setUpdatedItem} />
            <Table>
                <TableCaption>A list of available items.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        isLoading || isRefetching ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center text-red-500">
                                    Error loading items
                                </TableCell>
                            </TableRow>
                        ) : null
                    }
                    {items?.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button variant="outline" onClick={() => setUpdatedItem(item)}>Edit</Button>
                                <Button variant="destructive"
                                onClick={() => setDeletedItem(item)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


        </div>
    );
}
