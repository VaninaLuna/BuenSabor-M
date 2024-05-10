import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface ModalProps {
    showModal: boolean;
    handleClose: () => void;
    editing?: boolean;
}

export const ModalArticuloInsumo: React.FC<ModalProps> = ({ showModal, handleClose, editing }) => {
    // Estado del formulario
    const [formState, setFormState] = useState({
        denominacion: '',
        precioVenta: 0,
        precioCompra: 0,
        stockActual: 0,
        stockMaximo: 0,
        esParaElaborar: false,
        categoria: '',
        unidadMedida: '',
        urlImagen: '',
    });

    // Manejador de cambios del formulario
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    // Manejador de envío del formulario
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formState);
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{editing ? 'Editar' : 'Añadir'} Artículo Insumo</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Denominacion</Form.Label>
                        <Form.Control type="text" name="denominacion" value={formState.denominacion} onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Precio de Compra</Form.Label>
                        <Form.Control type="number" name="precioCompra" value={formState.precioCompra} onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Stock Actual</Form.Label>
                        <Form.Control type="number" name="stockActual" value={formState.stockActual} onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Stock Maximo</Form.Label>
                        <Form.Control type="number" name="stockMaximo" value={formState.stockMaximo} onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            label="¿Es para elaborar?"
                            name="esParaElaborar"
                            checked={formState.esParaElaborar}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select aria-label="Default select example" name="categoria" value={formState.categoria} onChange={handleInputChange}>
                            <option>Seleccionar Categoria</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Unidad de medida</Form.Label>
                        <Form.Select aria-label="Default select example" name="unidadMedida" value={formState.unidadMedida} onChange={handleInputChange}>
                            <option>Seleccionar Unidad de medida</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Agregar URL de la Imagen</Form.Label>
                        <Form.Control type="text" name="urlImagen" value={formState.urlImagen} onChange={handleInputChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};
