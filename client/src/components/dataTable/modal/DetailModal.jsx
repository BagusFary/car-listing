
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
 import { Input } from "../../ui/input";
 import { Label } from "../../ui/label";
 import { Button } from "../../ui/button";
 import { Textarea } from "../../ui/textarea";

export const DetailModal = ({car}) => {

  const { brand, type, stock, price, description } = car;

  return (

    <Dialog>
      <DialogTrigger className="cursor-pointer border border-2 rounded-xl p-2 py-1 group hover:bg-gray-500 transition-colors duration-150">
        <i className="fa-solid fa-eye text-sky-500 group-hover:text-white transition-colors duration-150"></i>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Detail Mobil</DialogTitle>
          <DialogDescription className="text-lg">
            Dibawah ini adalah detail dari mobil bekas.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="brand">Merek</Label>
            <Input id="brand" name="brand" value={brand} readOnly tabIndex="-1" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="type">Jenis</Label>
            <Input id="type" name="type" value={type} readOnly tabIndex="-1" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="stock">Stok</Label>
            <Input id="stock" name="stock" value={stock} readOnly tabIndex="-1" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="price">Harga</Label>
            <Input
              id="price"
              name="price"
              value={new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(price)}
              readOnly tabIndex="-1"
            />
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="description">Keterangan</Label>
          <Textarea
            id="description"
            name="description"
            value={description}
            readOnly
            tabIndex="-1"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Kembali
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  );
};
