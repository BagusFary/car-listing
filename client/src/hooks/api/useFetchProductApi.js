import { useState } from "react"
import { axiosInstance } from "../../config/axios";

export const useFetchProductApi = () => {

    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState('');

    const fetchProduct = async () => {

        try {
    
            setIsLoading(true);
            const response = await axiosInstance.get('/product');
            setProduct(response.data);
            setIsError('');

        } catch (error) {
            
            console.log(error);
            setIsError(error);
        
        } finally{
    
            setIsLoading(false);
    
        }

    }

    return {
        product,
        fetchProduct,
        isLoading,
        isError
    }

}