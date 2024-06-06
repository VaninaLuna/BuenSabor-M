import { useEffect, useState } from "react";
import { getRoles } from "../services/FuncionesRolesApi";
import Rol from "../models/Rol";

export function useRoles() {

    const [roles, setRol] = useState<Rol[]>([]);

    useEffect(() => {

        getRoles()
            .then(data => setRol(data))
            .catch(e => console.error(e));

    }, [])


    return { roles }
}