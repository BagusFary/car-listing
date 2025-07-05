import { axiosInstance } from "@/config/axios";
import { useState } from "react"


export const useDeleteCarApi = () => {

    const [isDeleted, setIsDeleted] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState('');

    const deleteCar = async (id) => {

        try {

            setIsLoading(true);

            const response = await axiosInstance.delete(`car/${id}`);
            setIsDeleted({
                message: response.data.message
            }); 

            console.log(isDeleted);

            setIsError('');

        } catch (error) {

            setIsError(error.message);

        } finally {

            setIsLoading(false);

        }

    }

    return {
        isDeleted,
        deleteCar,
        isLoading,
        isError
    }
}