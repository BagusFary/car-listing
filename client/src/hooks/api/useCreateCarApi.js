import { axiosInstance } from "@/config/axios";
import { useState } from "react"

export const useCreateCarApi = () => {

    const [isCreated, setIsCreated] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState('');

    const createCar = async (payload) => {

        try {

            setIsLoading(true);
            const response = await axiosInstance.post('car/', payload)
            
            setIsCreated({
                message: response.data.message
            });
            setIsError('');
        } catch (error) {

            setIsError(error);

        } finally {

            setIsLoading(false);

        }
    }

    return {
        isCreated,
        createCar,
        isLoading,
        isError
    }
}