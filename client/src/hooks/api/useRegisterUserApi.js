
import { axiosInstance } from "@/config/axios";
import { useState } from "react";

export const useRegisterUserApi = () => {
    
    const [response, setResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState('');

    const registerUserApi = async (payload) => {

        try {
            
            setIsLoading(true);
            const response = await axiosInstance.post('users/register',payload);
            setResponse(response);    
            
        } catch (error) {
    
            setIsError(error);
            throw error;
            
        } finally {
    
            setIsLoading(false);
    
        }

    }

    return {
        response,
        isLoading,
        isError,
        registerUserApi
    }

}