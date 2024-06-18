import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { UsuarioCliente } from "../../models/Usuario";
import Cliente from "../../models/Cliente";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import { getLocalidadesPorProvincia } from "../../services/LocalidadApi";
import Pais from "../../models/Pais";
import Provincia from "../../models/Provincia";
import Localidad from "../../models/Localidad";
import Domicilio from "../../models/Domicilio";
import { updateData } from "../../services/UsuarioClienteAPI";
import { getPaises } from "../../services/PaisApi";
import { getPronviciasPorPais } from "../../services/ProvinciaApi";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [jsonUsuario] = useState<any>(localStorage.getItem('usuario'));
    const usuario: UsuarioCliente = JSON.parse(jsonUsuario) as UsuarioCliente;
    const [cliente, setCliente] = useState(new Cliente());
    const [domicilio, setDomicilio] = useState<Domicilio>(new Domicilio());

    const [fechaNacimiento, setFechaNacimiento] = useState<string>("")
    const { setAuth }: AuthContextType = useContext(AuthContext);
    const navigate = useNavigate();

    // Estados para los elementos del combo box
    const [paises, setPaises] = useState<Pais[]>([]);
    const [provincias, setProvincias] = useState<Provincia[]>([]);
    const [localidades, setLocalidades] = useState<Localidad[]>([]);

    // Estados para las selecciones del usuario
    const [paisSeleccionado, setPaisSeleccionado] = useState<Pais | null>(null);
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState<Provincia | null>(null);
    const [localidadSeleccionada, setLocalidadSeleccionada] = useState<Localidad | null>(null);


    useEffect(() => {
        //Setea el cliente obtenido del usuario del localStorage
        setCliente(usuario.cliente);
        setDomicilio(usuario.cliente.domicilio)

        //Obtener los paises
        getPaises().then(setPaises);

        // Formatear la fecha para que la reconozca el input YYYY-MM-DD
        const formattedDate = moment(usuario.cliente.fechaNacimiento, 'DD/MM/YYYY').format('YYYY-MM-DD');
        setFechaNacimiento(formattedDate);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Obtener las provincias cuando el usuario selecciona un país
    useEffect(() => {
        if (paisSeleccionado !== null) {
            getPronviciasPorPais(paisSeleccionado.id).then(setProvincias);
        }
    }, [paisSeleccionado]);

    // Obtener las localidades cuando el usuario selecciona una provincia
    useEffect(() => {
        if (provinciaSeleccionada !== null) {
            getLocalidadesPorProvincia(provinciaSeleccionada.id).then(setLocalidades);
        }
    }, [provinciaSeleccionada]);


    if (isLoading) {
        return <div>Loading ...</div>;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const value: string = e.target.value;

        if (e.target.name === 'calle' || e.target.name === 'numero' || e.target.name === 'cp') {
            setDomicilio({ ...domicilio, [e.target.name]: value })

            // Si el campo que cambió es 'fechaNacimiento', actualizar el estado de fechaNacimiento
        } else if (e.target.name === 'fechaNacimiento') {
            setFechaNacimiento(value);
        } else {
            setCliente({ ...cliente, [e.target.name]: value });
        }
    }

    const handleSave = async () => {

        //Obtenemos los objetos actualizados
        const newUsuario = JSON.parse(JSON.stringify(usuario)) as UsuarioCliente;
        const newCliente = JSON.parse(JSON.stringify(cliente)) as Cliente;
        const newDomicilio = JSON.parse(JSON.stringify(domicilio)) as Domicilio;
        const newLocalidad = JSON.parse(JSON.stringify(localidadSeleccionada)) as Localidad;

        //colcar la localidad seleccionada en el domicilio
        newDomicilio.localidad = newLocalidad;

        // Formatear fecha de nacimiento
        newCliente.fechaNacimiento = moment(fechaNacimiento, 'YYYY-MM-DD').format('DD/MM/YYYY');
        newCliente.domicilio = newDomicilio

        console.log(JSON.stringify(newCliente))

        newUsuario.cliente = newCliente

        await updateData(newUsuario);
        //Actualizar el usuario en el localStorage
        setAuth({ usuario: newUsuario });

        navigate("/home");

    };

    return (
        user && isAuthenticated && (
            <>
                <Row className="mt-4 mb-3">
                    <img src={user.picture} alt={user.name} style={{ maxWidth: "150px", maxHeight: "150px" }} />
                </Row>

                <Form>
                    <Row>
                        <Col md={4} style={{ marginRight: "10px" }}>
                            <h3>Datos usuarios</h3>

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
                        </Col>
                        <Col className="" md={4}>
                            <h3>Domicilio</h3>

                            <Form.Group className="mb-3">
                                <Form.Label>Calle</Form.Label>
                                <Form.Control type="text" style={{ width: "44rem" }} name="calle" value={domicilio?.calle} onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Numero</Form.Label>
                                <Form.Control type="number" style={{ width: "9.5rem" }} name="numero" value={domicilio?.numero} onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>CP</Form.Label>
                                <Form.Control type="number" style={{ width: "9.5rem" }} name="cp" value={domicilio?.cp} onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Pais</Form.Label>
                                <Form.Control as="select" onChange={e => setPaisSeleccionado(paises.find(pais => pais.id === Number(e.target.value)) || null)}>
                                    <option value="">Seleccione un país</option>
                                    {paises.map(pais => (
                                        <option key={pais.id} value={pais.id}>{pais.nombre}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Provincia</Form.Label>
                                <Form.Control as="select" onChange={e => setProvinciaSeleccionada(provincias.find(provincia => provincia.id === Number(e.target.value)) || null)}>
                                    <option value="">Seleccione una provincia</option>
                                    {provincias.map(provincia => (
                                        <option key={provincia.id} value={provincia.id}>{provincia.nombre}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Localidad</Form.Label>
                                <Form.Control as="select" onChange={e => setLocalidadSeleccionada(localidades.find(localidad => localidad.id === Number(e.target.value)) || null)}>
                                    <option value="">Seleccione una localidad</option>
                                    {localidades.map(localidad => (
                                        <option key={localidad.id} value={localidad.id}>{localidad.nombre}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                        </Col>
                    </Row>
                    <button type="button" onClick={handleSave}>Guardar Cambios</button>
                </Form>



            </>
        )
    );
};

export default Profile;