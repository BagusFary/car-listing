import { useCreateCarApi } from "@/hooks/api/useCreateCarApi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LoaderPinwheel } from "lucide-react";

export const CreatePage = () => {
  const { register, handleSubmit, reset, formState } = useForm();
  const { isCreated, createCar, isLoading, isError } = useCreateCarApi();

  const handleCreate = async (data) => {
    try {

      await createCar(data);

      toast.success("Data Mobil berhasil ditambahkan!");

    } catch (error) {

      toast.error("Terjadi kesalahan pada server");

    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center mt-10">
        <div clas></div>
        <h1 className="text-3xl font-mono font-semibold mb-2">
          Form Tambah Mobil Bekas
        </h1>
        <div className="border border-2 border-black rounded-xl p-10 py-5 w-180">
            <form onSubmit={handleSubmit(handleCreate)}>
                <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                    <Label htmlFor="brand">Merek</Label>
                    <Input
                    placeholder="Honda"
                    disabled={isLoading}
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
                    <Input
                    placeholder="Jazz RS 1.5 A/T"
                    disabled={isLoading}
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
                    <Input
                    placeholder="5"
                    disabled={isLoading}
                    type="number"
                    {...register("stock", {
                        required: "Stok mobil harus diisi",
                        min: {
                        value: 1,
                        message: "Stok mobil minimal 1",
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
                    <Input
                    placeholder="50000000"
                    disabled={isLoading}
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
                <div className="grid gap-3 mt-4">
                <Label htmlFor="description">Keterangan</Label>
                <Textarea
                placeholder="Daihatsu Xenia tahun 2019, transmisi manual, warna silver, kaki-kaki senyap, mesin sehat."
                    disabled={isLoading}
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
                <div className="flex justify-end mt-5">
                    <Button
                    type="submit"
                    className="cursor-pointer"
                    disabled={isLoading}
                    >
                    {isLoading && <LoaderPinwheel className="animate-spin" />}

                    {!isLoading && "Tambah Data"}
                    </Button>
                </div>
            </form>
        </div>
      </div>
    </>
  );
};
