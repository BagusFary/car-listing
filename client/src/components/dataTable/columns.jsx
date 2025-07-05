import { DetailModal } from "./modal/DetailModal";
import { EditModal } from "./modal/EditModal";
import { DeleteModal } from "./modal/DeleteModal";




export const generateColumns = (fetchCar) => [
    {
        accessorKey: "brand",
        header: "Merek",
    },
    {
        accessorKey: "type",
        header: "Jenis",
    },
    {
        accessorKey: "stock",
        header: () => <div className="text-center">Stok</div>,
        cell: ({row}) => {
            return <div className="text-center">{row.getValue("stock")}</div>
        }
    },
    {
        accessorKey: "price",
        header: () => <div className="text-center">Harga</div> ,
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "IDR",
            }).format(price)
        
            return <div className="text-center font-semibold">{formatted}</div>
        },
         filterFn: (row, columnId, filterValue) => {
            return String(row.getValue(columnId)).includes(filterValue)
        }
    },
    {
        id: "actions",
        header: () => <div className="text-center">Aksi</div>,
        cell: ({row}) => {

            const car = row.original;

            return (
                <div className="flex justify-center gap-3">
                    <DetailModal car={car} />
                    <EditModal car={car} onSuccess={fetchCar}/>
                    <DeleteModal car={car} onSuccess={fetchCar}/>
                </div>
            )
        }
    }
]