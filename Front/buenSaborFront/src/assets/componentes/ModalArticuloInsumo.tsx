import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Categoria from '../entidades/Categoria';
import { getCategorias } from '../servicios/FuncionesCategoriaApi';
import UnidadMedida from '../entidades/UnidadMedida';
import { getUnidades } from '../servicios/FuncionesUnidadMedida';
import ArticuloInsumo from '../entidades/ArticuloInsumo';
import { getArticuloInsumoPorID, saveArticuloInsumo } from '../servicios/FuncionesArticuloInsumoApi';

interface ModalProps {
    showModal: boolean;
    handleClose: () => void;
    editing?: boolean;
    selectedId?: number | null;
}

export const ModalArticuloInsumo: React.FC<ModalProps> = ({ showModal, handleClose, editing, selectedId }) => {
    
    const [insumo, setArticuloInsumo] = useState<ArticuloInsumo>(new ArticuloInsumo());
    const [categorias, setCategoria] = useState<Categoria[]>([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number>(0);
    const [unidades, setUnidadesMedida] = useState<UnidadMedida[]>([]);
    const [unidadMedidaSeleccionada, setUnidadMedidaSeleccionada] = useState<number>(0);
    const [txtValidacion, setTxtValidacion] = useState<string>("");
    const [imagenes, setImagenes] = useState<string[]>(['']);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newImagenes = [...imagenes];
        newImagenes[index] = e.target.value;
        setImagenes(newImagenes);
    }

    const handleAddImage = () => {
        setImagenes([...imagenes, '']);
    }

    useEffect(() => {
        getCategorias()
            .then(data => setCategoria(data))
            .catch(e => console.error(e));

        getUnidades()
            .then(data => setUnidadesMedida(data))
            .catch(e => console.error(e));   
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (insumo.categoria) {
            setCategoriaSeleccionada(insumo.categoria.id);
        }
    }, [insumo]);

    useEffect(() => {
        if (!selectedId) {
            setArticuloInsumo(new ArticuloInsumo());            
        } else {            
            getArticuloInsumoPorID(selectedId)
                .then(data => {
                    setArticuloInsumo(data)
                    setCategoriaSeleccionada(data.categoria.id)
                    setUnidadMedidaSeleccionada(data.unidadMedida.id)
                    setImagenes(data.imagenes.map(img => img.url));
                })
                .catch(e => console.error(e));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId])

    const save = async () => {
        if(insumo?.denominacion === undefined || insumo.denominacion === ""){
            setTxtValidacion("Debe ingresar una denominacion");
            return;
        }
        if(insumo.precioVenta === undefined || insumo.precioVenta === 0){
            setTxtValidacion("Debe ingresar un precio de venta");
            return;
        }
        if(!insumo.imagenes){
            setTxtValidacion("Debe ingresar un modelo");
            return;
        }
        if(insumo.unidadMedida.denominacion === undefined || insumo.unidadMedida.denominacion === ""){
            setTxtValidacion("Debe ingresar una unidad de medida");
            return;
        }
        if(insumo.categoria.denominacion === undefined || insumo.categoria.denominacion === ""){
            setTxtValidacion("Debe ingresar una categoria");
            return;
        }
        if(insumo.precioCompra === undefined || insumo.precioCompra === 0){
            setTxtValidacion("Debe ingresar un precioCompra");
            return;
        }
        if(insumo.stockActual === undefined || insumo.stockActual === 0){
            setTxtValidacion("Debe ingresar un stock Actual");
            return;
        }
        if(insumo.stockMaximo === undefined || insumo.stockMaximo === 0){
            setTxtValidacion("Debe ingresar un stock Maximo");
            return;
        }

        // Creas nuevos objetos de imagen con las URLs proporcionadas
        const nuevasImagenes = imagenes.map((url) => ({ id: 0, url }));
        // Luego, asignas el array de nuevas imágenes al estado del insumo
        insumo.imagenes = nuevasImagenes;

        console.log(insumo);

       await saveArticuloInsumo(insumo).then(handleClose);       
    }

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{editing ? 'Editar' : 'Añadir'} Artículo Insumo</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form> {/* onSubmit={save} */}
                    <Form.Group className="mb-3">
                        <Form.Label>Denominacion</Form.Label>
                        <Form.Control type="text" name="denominacion" defaultValue={insumo?.denominacion} 
                        onChange={e => insumo.denominacion = String(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Precio de Compra</Form.Label>
                        <Form.Control type="number" name="precioCompra" defaultValue={insumo?.precioCompra}
                        onChange={e => insumo.precioCompra = Number(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Precio de Venta</Form.Label>
                        <Form.Control type="number" name="precioVenta" defaultValue={insumo?.precioVenta}
                        onChange={e => insumo.precioVenta = Number(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Stock Actual</Form.Label>
                        <Form.Control type="number" name="stockActual" defaultValue={insumo?.stockActual}
                        onChange={e => insumo.stockActual = Number(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Stock Maximo</Form.Label>
                        <Form.Control type="number" name="stockMaximo" defaultValue={insumo?.stockMaximo}
                        onChange={e => insumo.stockMaximo = Number(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            label="¿Es para elaborar?"
                            name="esParaElaborar"
                            defaultChecked={insumo?.esParaElaborar}
                            onChange={e => insumo.esParaElaborar = Boolean(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select aria-label="categoria" name="categoria" defaultValue={categoriaSeleccionada} 
                         onChange={e => {
                            const categoriaId = Number(e.target.value);
                            setCategoriaSeleccionada(categoriaId);
                            const categoria = categorias.find(c => c.id === categoriaId);
                            if (categoria && insumo) {
                                insumo.categoria = categoria;
                            }
                        }}>
                            <option value={0}>Selecciona una Categoría</option>
                            {categorias.map((categoria: Categoria) => 
                                <option key={categoria.id} value={categoria.id}>{categoria.denominacion}</option>
                            )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Unidad de medida</Form.Label>
                        <Form.Select aria-label="unidad" name="unidadMedida" defaultValue={unidadMedidaSeleccionada} 
                         onChange={e => {
                            const unidadMedidaId = Number(e.target.value);
                            setUnidadMedidaSeleccionada(unidadMedidaId);
                            const unidadMedida = unidades.find(u => u.id === unidadMedidaId);
                            if (unidadMedida && insumo) {
                                insumo.unidadMedida = unidadMedida;
                            }
                        }}>
                            <option value={0}>Selecciona una Unidad de Medida</option>
                            {unidades.map((unidad: UnidadMedida) => 
                                <option key={unidad.id} value={unidad.id}>{unidad.denominacion}</option>
                            )}
                        </Form.Select>
                    </Form.Group>

                    {/* <Form.Group className="mb-3">
                        <Form.Label>Agregar URL de la Imagen</Form.Label>
                        <Form.Control type="text" name="urlImagen" defaultValue={insumo?.imagenes[0]?.url}
                        onChange={e => insumo.imagenes[0].url = String(e.target.value)}/>
                    </Form.Group> */}
                     {imagenes.map((imagen, index) => (
                        <Form.Group className="mb-3" key={index}>
                            <Form.Label>Agregar URL de la Imagen {index + 1}</Form.Label>
                            <Form.Control
                                type="text"
                                name={`urlImagen${index}`}
                                defaultValue={imagen}
                                onChange={e => handleImageChange(e, index)}
                            />
                        </Form.Group>
                    ))}
                    <Button variant="secondary" onClick={handleAddImage}>Agregar otra imagen</Button>

                    <div>
                        <p style={{ color: 'red', lineHeight : 5, padding: 5 }}>{txtValidacion}</p>
                    </div>

                    <Button variant="primary" onClick={save}>
                        Guardar
                    </Button>

                    {/* <Button variant="primary" type="submit">
                        Guardar
                    </Button> */}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};
