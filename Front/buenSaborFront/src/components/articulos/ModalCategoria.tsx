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

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria>(new Categoria());
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [txtValidacion, setTxtValidacion] = useState<string>("");

    const handleCloseAndClear = () => {
        handleClose();
        setTxtValidacion("");
    };

    // const mapCategorias = (data: Categoria[], selectedId: number | null | undefined) => {
    //     const flatCategorias: Categoria[] = [];

    //     const processCategoria = (categoria: Categoria, parent: Categoria | null) => {
    //         const newCategoria = { ...categoria, categoriaPadre: parent };

    //         if (newCategoria.id !== selectedId && newCategoria.categoriaPadre?.id !== selectedId) {
    //             flatCategorias.push(newCategoria);

    //             if (categoria.subCategorias && categoria.subCategorias.length > 0) {
    //                 categoria.subCategorias.forEach(subCategoria => processCategoria(subCategoria, newCategoria));
    //             }
    //         }

    //     };
    //     data.forEach(categoria => processCategoria(categoria, null));

    //     return flatCategorias;
    // };

    useEffect(() => {
        const fetchAndProcessCategories = async () => {
            try {
                const data = await getCategorias();
                // const processedCategorias = mapCategorias(data, selectedId);
                const filter = data.filter(c => c.id !== selectedId && c.categoriaPadre?.id !== selectedId);
                setCategorias(filter);

                if (selectedId) {
                    const selectedCategory = await getCategoriaPorID(selectedId);
                    setCategoriaSeleccionada(selectedCategory);
                } else {
                    setCategoriaSeleccionada(new Categoria());
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchAndProcessCategories()
    }, [selectedId])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTxtValidacion("");

        setCategoriaSeleccionada({ ...categoriaSeleccionada, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategoriaId = Number(e.target.value);
        const selectedCategoria = categorias.find(c => c.id === selectedCategoriaId);
        setCategoriaSeleccionada({ ...categoriaSeleccionada, categoriaPadre: selectedCategoria || null });
    };

    // Manejador de envío del formulario
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (categoriaSeleccionada?.denominacion === undefined || categoriaSeleccionada.denominacion === "") {
            setTxtValidacion("Debe ingresar una denominacion");
            return;
        }
        console.log(JSON.stringify(categoriaSeleccionada));
        await saveCategoria(categoriaSeleccionada);
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
                        <Form.Control type="text" name="denominacion" value={categoriaSeleccionada?.denominacion || ''} onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Categoria Padre</Form.Label>
                        <Form.Select name="categoriaPadre" onChange={handleSelectChange} value={categoriaSeleccionada?.categoriaPadre?.id || 0}>
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