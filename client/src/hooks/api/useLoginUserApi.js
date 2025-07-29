import { axiosInstance } from "@/config/axios";
import { useState } from "react"

export const useLoginUserApi = () => {


    const [response, setResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState('');

    const loginUserApi = async (payload) => {

        try {
            
            setIsLoading(true);
            const response = await axiosInstance.post('users/login', payload);
            setResponse(response);
            setIsError('');

        } catch (error) {
            
            setIsError(error);
            console.log(error);

        } finally {

            setIsLoading(false);
        }
    }

    return {
        response, 
        isLoading,
        isError,
        loginUserApi
    }

}