import { Accordion, Button, Col, Form, Modal, Row } from "react-bootstrap";
import Sucursal from "../../models/Sucursal";
import { useEffect, useState } from "react";
import { getSucursalPorId, saveSucursal } from "../../services/SucursalApi";
import Empresa from "../../models/Empresa";
import { getEmpresa } from "../../services/EmpresaApi";
import Pais from "../../models/Pais";
import Provincia from "../../models/Provincia";
import Localidad from "../../models/Localidad";
import Domicilio from "../../models/Domicilio";
import { saveLocalidad } from "../../services/LocalidadApi";
import { saveDomicilio } from "../../services/DomicilioApi";

interface ModalProps {
    showModal: boolean;
    handleClose: () => void;
    editing?: boolean;
    selectedId?: number | null;
}

export const ModalSucursal: React.FC<ModalProps> = ({ showModal, handleClose, editing, selectedId }) => {

    const [sucursal, setSucursal] = useState<Sucursal>(new Sucursal());
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [txtValidacion, setTxtValidacion] = useState<string>("");

    const [pais, setPais] = useState<Pais>(new Pais())
    const [provincia, setProvincia] = useState<Provincia>(new Provincia())
    const [localidad, setLocalidad] = useState<Localidad>(new Localidad())
    const [domicilio, setDomicilio] = useState<Domicilio>(new Domicilio())

    const handleCloseAndClear = () => {
        setTxtValidacion("");
        handleClose();
    };

    useEffect(() => {
        if (!selectedId) {
            setSucursal(new Sucursal());
        } else {
            getSucursalPorId(selectedId)
                .then(data => {
                    setSucursal(data);
                    setDomicilio(data.domicilio);
                    setLocalidad(data.domicilio.localidad);
                    setProvincia(data.domicilio.localidad.provincia);
                    setPais(data.domicilio.localidad.provincia.pais);
                })
                .catch(e => console.error(e));
        }
    }, [selectedId])


    useEffect(() => {
        getEmpresa()
            .then((data: Empresa[]) => {

                const formatEmpresas = data.map(empresa => ({
                    id: empresa.id,
                    cuil: empresa.cuil,
                    nombre: empresa.nombre,
                    razonSocial: empresa.razonSocial
                }));

                setEmpresas(formatEmpresas);
            })
            .catch(e => console.error(e))
    }, [])


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        let value: string | boolean;

        if (e.target.type === 'checkbox') {
            value = (e.target as HTMLInputElement).checked;
        } else {
            value = e.target.value;
        }

        // Limpiamos el mensaje de validación
        setTxtValidacion("");

        if (e.target.name === 'empresa') {
            const selectedEmpresa = empresas.find(empresa => empresa.id === Number(value));

            if (selectedEmpresa) {
                setSucursal({ ...sucursal, empresa: selectedEmpresa });
            }


        } else if (e.target.name === 'calle') {

            const calleValue = value.toString();
            setDomicilio({ ...domicilio, [e.target.name]: calleValue })
        } else if (e.target.name === 'numero') {

            const numValue = Number(value);
            setDomicilio({ ...domicilio, [e.target.name]: numValue })
        } else if (e.target.name === 'cp') {

            const cpValue = Number(value);
            setDomicilio({ ...domicilio, [e.target.name]: cpValue })
        } else if (e.target.name === 'localidad') {

            const locValue = value.toString();
            setLocalidad({ ...localidad, nombre: locValue })

        } else if (e.target.name === 'provincia') {

            const provValue = value.toString();
            setProvincia({ ...provincia, nombre: provValue });

        } else if (e.target.name === 'pais') {

            const paisValue = value.toString();
            setPais({ ...pais, nombre: paisValue })

        } else {
            setSucursal({ ...sucursal, [e.target.name]: value });
        }
    };

    // Manejador de envío del formulario
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (sucursal?.nombre === undefined || sucursal.nombre === "") {
            setTxtValidacion("Debe ingresar un nombre");
            return;
        }
        if (sucursal.horarioApertura === undefined || sucursal.horarioApertura === "") {
            setTxtValidacion("Debe ingresar un horario de apertura");
            return;
        }
        if (sucursal.horarioCierre === undefined || sucursal.horarioCierre === "") {
            setTxtValidacion("Debe ingresar una horario de cierre");
            return;
        }
        if (sucursal.empresa.nombre === undefined || sucursal.empresa.nombre === "") {
            setTxtValidacion("Debe ingresar una empresa");
            return;
        }

        const sucursalActualizado = { ...sucursal };

        const paisActualizado = { ...pais };
        const provinciaActualizado = { ...provincia };
        const localidadActualizado = { ...localidad };

        provinciaActualizado.pais = paisActualizado;

        localidadActualizado.provincia = provinciaActualizado;

        const localidadFromDB = await saveLocalidad(localidadActualizado)

        console.log(JSON.stringify(localidadActualizado));

        console.log("\n")

        const domicilioActualizado = { ...domicilio };
        domicilioActualizado.localidad = localidadFromDB;

        const domicilioFromDB = await saveDomicilio(domicilioActualizado);

        console.log(JSON.stringify(domicilioActualizado))

        console.log("\n")

        sucursalActualizado.domicilio = domicilioFromDB;

        setSucursal(sucursalActualizado);

        await saveSucursal(sucursalActualizado);
        window.location.reload();

    };

    return (
        <Modal show={showModal} onHide={handleCloseAndClear} size="xl">

            <Modal.Header closeButton>
                <Modal.Title>{editing ? 'Editar' : 'Añadir'} Sucursal</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>nombre</Form.Label>
                        <Form.Control type="text" name="nombre" value={sucursal?.nombre} onChange={handleInputChange} />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Horario de Apertura</Form.Label>
                                <Form.Control type="time" name="horarioApertura" value={sucursal?.horarioApertura} onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Horario de cierre</Form.Label>
                                <Form.Control type="time" name="horarioCierre" value={sucursal?.horarioCierre} onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            label="¿Es la casa matriz?"
                            name="casaMatriz"
                            checked={sucursal?.casaMatriz}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Domicilio</Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Calle</Form.Label>
                                            <Form.Control type="text" style={{ width: "44rem" }} name="calle" value={domicilio?.calle} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Numero</Form.Label>
                                            <Form.Control type="number" style={{ width: "9.5rem" }} name="numero" value={domicilio?.numero} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>CP</Form.Label>
                                            <Form.Control type="number" style={{ width: "9.5rem" }} name="cp" value={domicilio?.cp} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Localidad</Form.Label>
                                            <Form.Control type="text" name="localidad" value={localidad?.nombre} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Provincia</Form.Label>
                                            <Form.Control type="text" name="provincia" value={provincia?.nombre} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Pais</Form.Label>
                                            <Form.Control type="text" name="pais" value={pais?.nombre} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3 mt-3">
                                <Form.Label>Empresa</Form.Label>
                                <Form.Select aria-label="Default select example" name="empresa" value={sucursal?.empresa.id} onChange={handleInputChange}>
                                    <option value={0}>Seleccionar Empresa</option>
                                    {empresas.map((empresa: Empresa) =>
                                        <option key={empresa.id} value={empresa.id}> {empresa.nombre} </option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <div>
                        <p style={{ color: 'red', lineHeight: 5, padding: 5 }}>{txtValidacion}</p>
                    </div>
                </Form>
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-between">
                <Button variant="secondary" onClick={handleCloseAndClear}>Cancelar</Button>
                <Button style={{ backgroundColor: '#83CA6A' }} onClick={handleSubmit}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
}