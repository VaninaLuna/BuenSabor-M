import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import { UsuarioCliente } from "../../models/Usuario";
import { saveUsuarioCliente } from "../../services/UsuarioClienteAPI";
import Cliente from "../../models/Cliente";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import { saveCliente } from "../../services/ClienteAPI";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [jsonUsuario] = useState<any>(localStorage.getItem('usuario'));
    const usuario: UsuarioCliente = JSON.parse(jsonUsuario) as UsuarioCliente;
    const [cliente, setCliente] = useState(new Cliente());
    const [fechaNacimiento, setFechaNacimiento] = useState<string>("")
    const { auth, setAuth }: AuthContextType = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        setCliente(usuario.cliente);
        // Formatear la fecha para que la reconozca el input YYYY-MM-DD
        const formattedDate = moment(usuario.cliente.fechaNacimiento, 'DD/MM/YYYY').format('YYYY-MM-DD');
        setFechaNacimiento(formattedDate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const value: string = e.target.value;

        // Si el campo que cambió es 'fechaNacimiento', actualizar el estado de fechaNacimiento
        if (e.target.name === 'fechaNacimiento') {
            setFechaNacimiento(value);
        } else {
            setCliente({ ...cliente, [e.target.name]: value });
        }
    }

    const handleSave = async () => {

        //Obtenemos los objetos actualizados
        const newUsuario = JSON.parse(JSON.stringify(usuario)) as UsuarioCliente;
        const newCliente = JSON.parse(JSON.stringify(cliente));

        // Formatear fecha de nacimiento
        newCliente.fechaNacimiento = moment(fechaNacimiento, 'YYYY-MM-DD').format('DD/MM/YYYY');

        //Actualizar cliente en BD
        await saveCliente(newCliente);

        newUsuario.cliente = newCliente

        setAuth({ usuario: newUsuario });

        console.log(JSON.stringify(newCliente))
        navigate("/home");
    };

    return (
        user && isAuthenticated && (
            <>
                <Row className="mt-4 mb-3">
                    <img src={user.picture} alt={user.name} style={{ maxWidth: "150px", maxHeight: "150px" }} />
                </Row>

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={cliente.email} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" value={cliente.nombre} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="text" name="apellido" value={cliente?.apellido || ""} onChange={handleInputChange} readOnly={usuario?.cliente.apellido ? true : false} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha de Nacimiento</Form.Label>
                        <Form.Control type="date" name="fechaNacimiento" value={fechaNacimiento || ""} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control type="text" name="telefono" value={cliente?.telefono || ""} onChange={handleInputChange} />
                    </Form.Group>
                    <button type="button" onClick={handleSave}>Guardar Cambios</button>
                </Form>

            </>
        )
    );
};

export default Profile;