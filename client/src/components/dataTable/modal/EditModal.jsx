import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";
import { useUpdateCarApi } from "@/hooks/api/useUpdateCarApi";
import { LoaderPinwheel } from "lucide-react";
import toast from "react-hot-toast";
import isEqual from 'fast-deep-equal';

export const EditModal = ({ car, onSuccess }) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const { isUpdated, updateCar, isLoading, isError } = useUpdateCarApi();

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: car,
  });

  const editedData = async (data) => {

    if(isEqual(car, data)){
      toast.error("Anda tidak melakukan perubahan data mobil");
      return;
    }

    try {

      await updateCar(data._id, data);
      setIsOpen(false);

      onSuccess?.();
      toast.success("Data Mobil berhasil di Update!");

    } catch (error) {
      
      toast.error("Terjadi kesalahan pada server");

    }
  };

  useEffect(() => {
    if (isOpen) {
      reset(car);
    }
  }, [isOpen, car, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="cursor-pointer border border-2 rounded-xl p-2 py-1 group hover:bg-gray-500 transition-colors duration-150">
        <i className="fa-solid fa-pencil text-amber-500 group-hover:text-white transition-colors duration-150"></i>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form className="grid gap-4" onSubmit={handleSubmit(editedData)}>
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Mobil</DialogTitle>
            <DialogDescription className="text-lg">
              Dibawah adalah form edit data mobil.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="brand">Merek</Label>
              <Input disabled={isLoading}
                {...register("brand", {
                  required: "Merek mobil harus diisi",
                  maxLength: {
                    value: 100,
                    message: "Merek mobil maksimal 100 karakter",
                  },
                })}
                autoComplete="off"
              />
              {formState.errors.brand && (
                <p className="text-red-500 text-sm">
                  {formState.errors.brand.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="type">Jenis</Label>
              <Input disabled={isLoading}
                {...register("type", {
                  required: "Jenis mobil harus diisi",
                  maxLength: {
                    value: 100,
                    message: "Jenis mobil maksimal 100 karakter",
                  },
                })}
                autoComplete="off"
              />
              {formState.errors.type && (
                <p className="text-red-500 text-sm">
                  {formState.errors.type.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="stock">Stok</Label>
              <Input disabled={isLoading}
                type="number"
                {...register("stock", {
                  required: "Stok mobil harus diisi",
                  min: {
                    value: 0,
                    message: "Stok mobil minimal 0",
                  },
                  max: {
                    value: 999,
                    message: "Stok mobil maksimal 999",
                  },
                })}
                autoComplete="off"
              />
              {formState.errors.stock && (
                <p className="text-red-500 text-sm">
                  {formState.errors.stock.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="price">Harga</Label>
              <Input disabled={isLoading}
                type="number"
                {...register("price", {
                  required: "Harga mobil harus diisi",
                  min: {
                    value: 10000000,
                    message: "Harga mobil minimal 10 juta",
                  },
                  max: {
                    value: 1000000000,
                    message: "Harga mobil maksimal 1 miliar",
                  },
                })}
                autoComplete="off"
              />
              {formState.errors.price && (
                <p className="text-red-500 text-sm">
                  {formState.errors.price.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Keterangan</Label>
            <Textarea disabled={isLoading}
              {...register("description", {
                required: "Keterangan mobil harus diisi",
                maxLength: {
                  value: 200,
                  message: "Keterangan mobil maksimal 200 kata",
                },
              })}
              autoComplete="off"
            />
            {formState.errors.description && (
              <p className="text-red-500 text-sm">
                {formState.errors.description.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer" disabled={isLoading}>
                Kembali
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isLoading}
            >
              {isLoading && <LoaderPinwheel className="animate-spin" />}

              {!isLoading && "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
