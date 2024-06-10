import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import { UsuarioCliente } from "../../models/Usuario";
import { saveUsuarioCliente } from "../../services/UsuarioClienteAPI";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [jsonUsuario] = useState<any>(localStorage.getItem('usuario'));
    const usuario: UsuarioCliente = JSON.parse(jsonUsuario) as UsuarioCliente;


    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    };

    const handleSave = async () => {
        //await saveUsuarioCliente(usuarioLogueado);
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
                        <Form.Control type="email" value={user.email} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" value={usuario?.cliente.nombre || ""} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" value={usuario?.cliente.apellido || ""} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha de Nacimiento</Form.Label>
                        <Form.Control type="date" name="fechaNacimiento" value={usuario?.cliente.fechaNacimiento || ""} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control type="tel" name="telefono" value={usuario?.cliente.telefono || ""} onChange={handleInputChange} />
                    </Form.Group>
                    <button type="button" onClick={handleSave}>Guardar</button>
                </Form>

            </>
        )
    );
};

export default Profile;