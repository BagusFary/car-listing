import { useState } from "react";
import { axiosInstance } from "@/config/axios";


export const useUpdateCarApi = () => {

    const [isUpdated, setIsUpdated] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState('');

    const updateCar = async (id, payload) => {

        try {

            setIsLoading(true);
    
            const response = await axiosInstance.put(`car/${id}`, payload);
            setIsUpdated({
                    message: response.data.message
                });
            setIsError('');

        } catch (error) {
            
            setIsError(error.message);

        } finally {

            setIsLoading(false);
            
        }
    }

    return {
        isUpdated,
        updateCar,
        isLoading,
        isError
    }

}