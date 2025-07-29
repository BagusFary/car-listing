
import { Outlet, Navigate } from "react-router";

export const RequireAuth = () => {
    
    // Continue learning how token auth works
    // is validating jwttoken here?

    const token = localStorage.getItem('credentials');

    if(!token){
        return <Navigate to='/login'/>;
    }

    return <Outlet />

}