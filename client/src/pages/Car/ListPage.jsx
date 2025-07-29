import { useFetchCarApi } from "@/hooks/api/useFetchCarApi"
import { useEffect } from "react";
import { DataTable } from "@/components/dataTable/DataTable";
import { generateColumns } from "@/components/dataTable/columns";
import { LoaderPinwheel } from "lucide-react";
import { useState } from "react";



export const ListPage = () => {

    const {car, fetchCar, isLoading, isError} = useFetchCarApi();

    const [columns, setColumns] = useState([]);


    useEffect(() => {
        fetchCar();

        const loadColumns = () => {

            const getColumns = generateColumns(fetchCar);
            setColumns(getColumns);

        }

        loadColumns();

    },[]);
    
    return(
        <>
            <div className="h-screen w-full flex flex-col items-center gap-5 mt-10 mb-15">
                <h1 className="text-3xl font-mono font-semibold">Daftar Mobil Bekas</h1>
                {
                    isLoading && <LoaderPinwheel className="animate-spin" />
                }
                {
                    !isLoading && columns.length > 0 && (
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