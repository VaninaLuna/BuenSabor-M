import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const RutaPrivada = ({ children }: { children: ReactNode }) => {

    const { auth } = useContext(AuthContext); // Obtiene el estado de autenticación del contexto

    return auth.usuario ? ( // Verifica si hay un token de autenticación en el estado
        <>
            {children}
        </>
    ) : (
        <Navigate to='/login' /> // Redirige al usuario a la página de inicio de sesión si no está autenticado
    );
};