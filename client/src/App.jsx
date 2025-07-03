import { useEffect } from "react";
import { useFetchProductApi } from "./hooks/api/useFetchProductApi";


export const App = () => {


    const { product, fetchProduct, isLoading : isProductLoading, isError : isProductError } = useFetchProductApi();

    useEffect(() => {
        console.log('dijalankan');
        fetchProduct();
    },[]);

    useEffect(() => {
        console.log(product);
    },[product]);

    return (
        <>
            <div className="h-screen w-screen flex justify-center items-center">
                <h1 className="text-5xl font-mono font-semibold">Hello World</h1>
            </div>
        </>
    )
}