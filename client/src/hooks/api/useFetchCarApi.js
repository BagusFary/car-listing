
import { useState } from "react";
import { axiosInstance } from "../../config/axios";

export const useFetchCarApi = () => {

    const [car, setCar] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState('');

    const fetchCar = async (id) => {

        const credentials = JSON.parse(localStorage.getItem("credentials"));

        try {

            setIsLoading(true);
            const response = await axiosInstance.get(`car/${id ?? ''}`,
                {
                    headers: {
                        "Authorization" : `Bearer ${credentials.token}`
                    }
                }
            );

            setCar(response.data.data);
            setIsError('');

        } catch (error) {

            setIsError(error.message);

        } finally {

            setIsLoading(false);

        }

    }

    return {
        car, 
        fetchCar,
        isLoading,
        isError,
    }

}