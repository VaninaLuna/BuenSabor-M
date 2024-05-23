import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Sucursal from "../../models/Sucursal";
import { useEffect, useState } from "react";
import { getSucursalPorId, saveSucursal } from "../../services/SucursalApi";
import Empresa from "../../models/Empresa";
import { getEmpresa } from "../../services/FuncionesEmpresa";
import { ModalAgregarDomicilio } from "./ModalAgregarDomicilio";

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
    const [showModalDomicilio, setShowModalDomicilio] = useState(false);

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
                    setSucursal(data)
                })
                .catch(e => console.error(e));
        }
    }, [selectedId])

    useEffect(() => {
        getEmpresa()
            .then(data => setEmpresas(data))
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

        // Luego, asignas el array de nuevas imágenes al estado del insumo
        setSucursal(sucursalActualizado);

        console.log(JSON.stringify(sucursalActualizado));
        await saveSucursal(sucursalActualizado);
        window.location.reload();
    };

    const handleCloseDomicilio = () => {
        setShowModalDomicilio(false);
    };

    return (
        <Modal show={showModal} onHide={handleCloseAndClear} size="xl">

            <ModalAgregarDomicilio
                handleCloseDomicilio={handleCloseDomicilio}
                showModalDomicilio={showModalDomicilio}
            />

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
                                <Form.Control type="text" name="horarioApertura" value={sucursal?.horarioApertura} onChange={handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Horario de cierre</Form.Label>
                                <Form.Control type="text" name="horarioCierre" value={sucursal?.horarioCierre} onChange={handleInputChange} />
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
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
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