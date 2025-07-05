import { useFetchCarApi } from "@/hooks/api/useFetchCarApi"
import { useEffect } from "react";
import { DataTable } from "@/components/dataTable/DataTable";
import { generateColumns } from "@/components/dataTable/columns";
import { LoaderPinwheel } from "lucide-react";



export const ListPage = () => {

    const {car, fetchCar, isLoading, isError} = useFetchCarApi();

    const columns = generateColumns(fetchCar);

    useEffect(() => {
        fetchCar();
    },[]);

    return(
        <>
            <div className="h-screen w-full flex flex-col items-center gap-5 mt-10 mb-15">
                <h1 className="text-3xl font-mono font-semibold">Daftar Mobil Bekas</h1>
                {
                    isLoading && <LoaderPinwheel className="animate-spin" />
                }
                {
                    !isLoading && (
                        <DataTable fetchCar={fetchCar} columns={columns} data={car} />
                    )
                }
                {
                    isError && "Terjadi kesalahan pada server"
                }
            </div>
        </>
    )
}