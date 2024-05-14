import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import Categoria from '../entidades/Categoria';
import { getCategorias } from '../servicios/FuncionesCategoriaApi';
import UnidadMedida from '../entidades/UnidadMedida';
import { getUnidades } from '../servicios/FuncionesUnidadMedida';
import ArticuloInsumo from '../entidades/ArticuloInsumo';
import { getArticuloManufacturadoPorID, saveArticuloManufacturado } from '../servicios/FuncionesArticuloManufacturadoApi';
import ArticuloManufacturado from '../entidades/ArticuloManufacturado';
import { getArticulosInsumos } from '../servicios/FuncionesArticuloInsumoApi';

interface ModalProps {
    showModal: boolean;
    handleClose: () => void;
    editing?: boolean;
    selectedId?: number | null;
}

export const ModalArticuloManufacturado: React.FC<ModalProps> = ({ showModal, handleClose, editing, selectedId }) => {

    const [categorias, setCategoria] = useState<Categoria[]>([]);
    const [unidades, setUnidadesMedida] = useState<UnidadMedida[]>([]);
    const [manufacturado, setArticuloManufacturado] = useState<ArticuloManufacturado>(new ArticuloManufacturado());
    const [insumos, setArticulosInsumos] = useState<ArticuloInsumo[]>([]);
    const [imagenes, setImagenes] = useState<string[]>(['']);
    const [txtValidacion, setTxtValidacion] = useState<string>("");

    const handleCloseAndClear = () => {
        // Llama a handleClose
        handleClose();

        // Limpia el estado
        setImagenes(['']);
        setTxtValidacion("");
    };


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, index: number) => {
        const newImagenes = [...imagenes];
        newImagenes[index] = e.target.value;
        setImagenes(newImagenes);

        // Limpiamos el mensaje de validación
        setTxtValidacion("");
    }
    
    const handleAddImage = () => {
        setImagenes([...imagenes, '']);
    }

    const handleSelectInsumoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, index: number) => {
        const newInsumoId = e.target.value;
        console.log(newInsumoId);
        const newInsumo = insumos.find(insumo => insumo.id === Number(newInsumoId));
        if(newInsumo){
            setArticuloManufacturado(prevState => {
                const newDetalles = [...prevState.articuloManufacturadoDetalles];
                newDetalles[index].articuloInsumo = newInsumo;
                return {...prevState, articuloManufacturadoDetalles: newDetalles};
            });
        }
    }

    const handleCantidadInsumoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, index: number) => {
        const newCantidad = e.target.value;

        if(newCantidad){
            setArticuloManufacturado(prevState => {
                const newDetalles = [...prevState.articuloManufacturadoDetalles];
                newDetalles[index].cantidad = Number(newCantidad);
                return {...prevState, articuloManufacturadoDetalles: newDetalles};
            });
        }       
    };

    const handleAddDetalle = () => {
        setArticuloManufacturado(prevState => {
            const newDetalle = {
                id: 0, // Genera un ID único para el nuevo detalle
                cantidad: 0,
                articuloInsumo: insumos[0], // Asume que el primer insumo es el valor predeterminado
                articuloManufacturado: prevState // Asegúrate de incluir la propiedad articuloManufacturado
            };
            return {...prevState, articuloManufacturadoDetalles: [...prevState.articuloManufacturadoDetalles, newDetalle]};
        });
    };

    useEffect(() => {
        getCategorias()
            .then(data => setCategoria(data))
            .catch(e => console.error(e));

        getUnidades()
            .then(data => setUnidadesMedida(data))
            .catch(e => console.error(e));

        getArticulosInsumos()
            .then(data => setArticulosInsumos(data))
            .catch(e => console.error(e));
    }, [])

    useEffect(() => {
        if (!selectedId) {
            setArticuloManufacturado(new ArticuloManufacturado());
        } else {
            getArticuloManufacturadoPorID(selectedId)
                .then(data => {
                    setArticuloManufacturado(data)
                    setImagenes(data.imagenes.map(img => img.url));
                })
                .catch(e => console.error(e));
        }
    }, [selectedId])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        let value: string | boolean;

        if (e.target.type === 'checkbox') {
            value = (e.target as HTMLInputElement).checked;
        } else {
            value = e.target.value;
        }

        // Limpiamos el mensaje de validación
        setTxtValidacion("");

        if (e.target.name === 'categoria') {
            const selectedCategoria = categorias.find(categoria => categoria.id === Number(value));
            if (selectedCategoria) {
                setArticuloManufacturado({ ...manufacturado, categoria: selectedCategoria });
            }
        } else if (e.target.name === 'unidadMedida') {
            const selectedUnidadMedida = unidades.find(unidad => unidad.id === Number(value));
            if (selectedUnidadMedida) {
                setArticuloManufacturado({ ...manufacturado, unidadMedida: selectedUnidadMedida });
            }
        }
        else {
            setArticuloManufacturado({ ...manufacturado, [e.target.name]: value });
        }
    };

    // Manejador de envío del formulario
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (manufacturado?.denominacion === undefined || manufacturado.denominacion === "") {
            setTxtValidacion("Debe ingresar una denominacion");
            return;
        }
        if (manufacturado.precioVenta === undefined || manufacturado.precioVenta === 0) {
            setTxtValidacion("Debe ingresar un precio de venta");
            return;
        }
        if (!manufacturado.imagenes || imagenes.every(url => url === "")) {
            setTxtValidacion("Debe ingresar al menos una imagen");
            return;
        }
        if (manufacturado.unidadMedida.denominacion === undefined || manufacturado.unidadMedida.denominacion === "") {
            setTxtValidacion("Debe ingresar una unidad de medida");
            return;
        }
        if (manufacturado.categoria.denominacion === undefined || manufacturado.categoria.denominacion === "") {
            setTxtValidacion("Debe ingresar una categoria");
            return;
        }
        if (manufacturado.descripcion === undefined || manufacturado.descripcion === "") {
            setTxtValidacion("Debe ingresar un descripcion");
            return;
        }
        if (manufacturado.tiempoEstimadoMinutos === undefined || manufacturado.tiempoEstimadoMinutos === 0) {
            setTxtValidacion("Debe ingresar un tiempoEstimadoMinutos");
            return;
        }
        if (manufacturado.preparacion === undefined || manufacturado.preparacion === "") {
            setTxtValidacion("Debe ingresar una preparacion");
            return;
        }


        // Creas nuevos objetos de imagen con las URLs proporcionadas
        const nuevasImagenes = imagenes.map((url) => ({ id: 0, url }));
        console.log("NUEVAS IMAGENES" + JSON.stringify(nuevasImagenes))

        // Creas una copia del estado del manufacturado
        const manufacturadoActualizado = { ...manufacturado };

        // Actualizas la copia del manufacturado
        manufacturadoActualizado.imagenes = nuevasImagenes;

        // Luego, asignas el array de nuevas imágenes al estado del manufacturado
        setArticuloManufacturado(manufacturadoActualizado);

        console.log(JSON.stringify(manufacturadoActualizado));
        await saveArticuloManufacturado(manufacturadoActualizado);
        window.location.reload();
    };

    return (
        <Modal show={showModal} onHide={handleCloseAndClear}>
            <Modal.Header closeButton>
                <Modal.Title>{editing ? 'Editar' : 'Añadir'} Artículo Manufacturado</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Denominacion</Form.Label>
                        <Form.Control type="text" name="denominacion" value={manufacturado?.denominacion} onChange={handleInputChange} />
                    </Form.Group>

                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Precio de Venta</Form.Label>
                            <Form.Control type="number" name="precioVenta" value={manufacturado?.precioVenta} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Tiempo Estimado en Minutos</Form.Label>
                            <Form.Control type="number" name="tiempoEstimadoMinutos" value={manufacturado?.tiempoEstimadoMinutos} onChange={handleInputChange} />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control type="text" name="descripcion" value={manufacturado?.descripcion} onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Preparacion</Form.Label>
                        <Form.Control type="text" name="preparacion" value={manufacturado?.preparacion} onChange={handleInputChange} />
                    </Form.Group>                   

                    <Form.Group className="mb-3">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select aria-label="Default select example" name="categoria" value={manufacturado?.categoria.id} onChange={handleInputChange}>
                            <option value={0}>Seleccionar Categoria</option>

                            {categorias.map((categoria: Categoria) =>
                                <option key={categoria.id} value={categoria.id}> {categoria.denominacion} </option>
                            )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Unidad de medida</Form.Label>
                        <Form.Select aria-label="Default select example" name="unidadMedida" value={manufacturado?.unidadMedida.id} onChange={handleInputChange}>
                            <option value={0}>Seleccionar Unidad de medida</option>

                            {unidades.map((unidad: UnidadMedida) =>
                                <option key={unidad.id} value={unidad.id}> {unidad.denominacion} </option>
                            )}
                        </Form.Select>
                    </Form.Group>

                    {manufacturado.articuloManufacturadoDetalles.map((detalle, index) => (
                         <Row key={index}>
                         <Form.Group as={Col} className="mb-3">
                             <Form.Label>Agregar insumo {index + 1}</Form.Label>
                             <Form.Select aria-label="insumo" name="insumo" value={detalle.articuloInsumo.id} 
                             onChange={e => handleSelectInsumoChange(e, index)}>
                                 <option value={0}>Seleccionar un Insumo</option>
                                 {insumos.map((insumo: ArticuloInsumo) =>
                                     <option key={insumo.id} value={insumo.id}> {insumo.denominacion} </option>
                                 )}
                             </Form.Select>
                         </Form.Group>
     
                         <Form.Group as={Col} className="mb-3">
                             <Form.Label>Cantidad</Form.Label>
                             <Form.Control type="number" name="cantidad" value={detalle.cantidad} onChange={e => handleCantidadInsumoChange(e, index)} />
                         </Form.Group>
                     </Row>
                    ))}
                    <Button variant="secondary" onClick={handleAddDetalle}>Agregar Insumo</Button>

                    {imagenes.map((imagen, index) => (
                        <Form.Group className="mb-3" key={index}>
                            <Form.Label>Agregar URL de la Imagen {index + 1}</Form.Label>
                            <Form.Control
                                type="text"
                                name={`urlImagen${index}`}
                                value={imagen}
                                onChange={e => handleImageChange(e, index)}
                            />
                        </Form.Group>
                    ))}
                    <Button variant="secondary" onClick={handleAddImage}>Agregar otra imagen</Button>

                    <div>
                        <p style={{ color: 'red', lineHeight: 5, padding: 5 }}>{txtValidacion}</p>
                    </div>

                    <Button variant="primary" type="submit">
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