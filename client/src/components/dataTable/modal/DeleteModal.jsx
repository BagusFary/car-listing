
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose

 } from "../../ui/dialog";
 import { Button } from "../../ui/button";
import { useDeleteCarApi } from "@/hooks/api/useDeleteCarApi";
import { LoaderPinwheel } from "lucide-react";
import toast from "react-hot-toast";

export const DeleteModal = ({car, onSuccess}) => {
    const {_id} = car;
    const {isDeleted, deleteCar, isLoading, isError} = useDeleteCarApi();

    const handleDelete = async () => {

        try {

            await deleteCar(_id);

            toast.success('Data Mobil berhasil dihapus!');
            onSuccess?.();

        } catch (error) {

            toast.error('Terjadi kesalahan pada server');

        }
    }

    return (
        <Dialog>
            <DialogTrigger className=" cursor-pointer border border-2 rounded-xl p-2 py-1 group hover:bg-gray-500 transition-colors duration-150">
                <i className="fa-solid fa-trash text-red-500 group-hover:text-white transition-colors duration-150"></i>
            </DialogTrigger>
            <DialogContent className="py-10">
                <DialogHeader>
                <DialogTitle className="text-xl">Hapus Mobil?</DialogTitle>
                <DialogDescription className="text-lg">
                    Apakah anda yakin?, Data mobil akan dihapus dari database
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button disabled={isLoading} variant="outline" className="cursor-pointer">Kembali</Button>
                    </DialogClose>
                    <Button type="button" onClick={handleDelete} disabled={isLoading} className="cursor-pointer hover:bg-red-500 transition-colors duration-150">
                        {isLoading && <LoaderPinwheel className="animate-spin" />}
                        {!isLoading && "Hapus"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}