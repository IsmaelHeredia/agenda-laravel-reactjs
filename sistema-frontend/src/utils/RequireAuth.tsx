import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { logout } from "@store/reducers/authSlice";

import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";

const RequireAuth = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setIsAuthenticated(false);
                setIsLoading(false);
                dispatch(logout());
                return;
            }

            try {
                const url = import.meta.env.VITE_API_URL + "/validar";

                const res = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                setIsAuthenticated(true);
            } catch (e) {
                console.error("Error al validar el token o token no válido:", e);
                setIsAuthenticated(false);
                dispatch(logout());
            } finally {
                setIsLoading(false);
            }
        };

        validateToken();
    }, [dispatch, token]);

    if (isLoading) {
        return <LoadingOverlay open={true} message="Validando autenticación..." />;
    }

    if (isAuthenticated) {
        return <Outlet />;
    }

    return <Navigate to="/ingreso" state={{ from: location }} replace />;
};

export default RequireAuth;
