import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Categoria from '../../models/Categoria';
import { getCategoriaPorID, getCategorias, saveCategoria } from '../../services/FuncionesCategoriaApi';

interface ModalProps {
    showModal: boolean;
    handleClose: () => void;
    editing?: boolean;
    selectedId?: number | null;
}

export const ModalCategoria: React.FC<ModalProps> = ({ showModal, handleClose, editing, selectedId }) => {

    const [categoria, setCategoria] = useState<Categoria>(new Categoria());
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [txtValidacion, setTxtValidacion] = useState<string>("");

    const handleCloseAndClear = () => {
        handleClose();
        setTxtValidacion("");
    };

    useEffect(() => {
        getCategorias()
            .then(data => { setCategorias(data) })
            .then(() => setCategorias(data => {
                return data.filter(c => c.id !== selectedId && c.categoriaPadre?.id !== selectedId);
            }))
            .catch(e => console.error(e));

        if (!selectedId) {
            setCategoria(new Categoria());
        } else {
            getCategoriaPorID(selectedId)
                .then(data => {
                    setCategoria(data)
                })
                .catch(e => console.error(e));
        }
    }, [selectedId])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Limpiamos el mensaje de validación
        setTxtValidacion("");

        setCategoria({ ...categoria, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategoria = categorias.find(c => c.id === Number(e.target.value));
        setCategoria({ ...categoria, categoriaPadre: selectedCategoria });
    };

    // Manejador de envío del formulario
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (categoria?.denominacion === undefined || categoria.denominacion === "") {
            setTxtValidacion("Debe ingresar una denominacion");
            return;
        }

        // Luego, asignas el array de nuevas imágenes al estado del insumo
        setCategoria(categoria);

        console.log(JSON.stringify(categoria));
        await saveCategoria(categoria);
        window.location.reload();
    };

    return (
        <Modal show={showModal} onHide={handleCloseAndClear}>
            <Modal.Header closeButton>
                <Modal.Title>{editing ? 'Editar' : 'Añadir'} Categoria</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Denominacion</Form.Label>
                        <Form.Control type="text" name="denominacion" value={categoria?.denominacion} onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Categoria Padre</Form.Label>
                        <Form.Select name="categoriaPadre" onChange={handleSelectChange} value={categoria?.categoriaPadre?.id || 0}>
                            <option value={0}>Seleccione una categoria padre</option>
                            {categorias.map((c, index) => (
                                <option key={index} value={c.id}>{c.denominacion}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <div>
                        <p style={{ color: 'red', lineHeight: 5, padding: 5 }}>{txtValidacion}</p>
                    </div>
                    <Button style={{ backgroundColor: '#83CA6A' }} type="submit">
                        Guardar
                    </Button>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAndClear}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};