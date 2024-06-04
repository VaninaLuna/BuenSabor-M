import { useEffect, useState } from "react"
import ArticuloInsumo from "../../models/ArticuloInsumo";
import { getArticulosInsumosByEsParaElaborar } from "../../services/FuncionesArticuloInsumoApi";
import { getArticulosManufacturados } from "../../services/FuncionesArticuloManufacturadoApi";
import ArticuloManufacturado from "../../models/ArticuloManufacturado";
import ArticuloDTO from "../../models/ArticuloDTO";
import { Card, Form } from "react-bootstrap";

export function Articulos() {

    const [filteredArticulos, setFilteredArticulos] = useState<ArticuloDTO[]>([]);
    const [allArticulos, setAllArticulos] = useState<ArticuloDTO[]>([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const insumos: ArticuloInsumo[] = await getArticulosInsumosByEsParaElaborar(false);
            const manufacturados: ArticuloManufacturado[] = await getArticulosManufacturados();

            const newArticulos: ArticuloDTO[] = [];

            insumos.map((insumo: ArticuloInsumo) => {
                const newArticulo = {
                    denominacion: insumo.denominacion,
                    precioVenta: insumo.precioVenta,
                    imagenes: insumo.imagenes
                }
                newArticulos.push(newArticulo);
            })

            manufacturados.map((manufacturado: ArticuloManufacturado) => {
                const newArticulo = {
                    denominacion: manufacturado.denominacion,
                    precioVenta: manufacturado.precioVenta,
                    imagenes: manufacturado.imagenes
                }
                newArticulos.push(newArticulo);
            })

            setAllArticulos(newArticulos);
            setFilteredArticulos(newArticulos);
        };

        fetchData();
    }, []);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilter(value);

        const filtered = allArticulos.filter(articulo =>
            articulo.denominacion.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredArticulos(filtered);
    };

    return (
        <>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Form.Control
                    type="text"
                    placeholder="Filtrar por ID o Denominación"
                    value={filter}
                    onChange={handleFilterChange}
                    style={{ margin: 50, width: '300px', height: '50px' }}
                />
            </div>
            <div className="main container">
                <div className="row justify-content-center">
                    {
                        filteredArticulos.map((articulo: ArticuloDTO, index) => {
                            return (
                                <Card key={index} className="m-4 mx-auto text-center" style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={articulo.imagenes[0].url} alt={articulo.denominacion} />
                                    <Card.Body>
                                        <Card.Title>{articulo.denominacion}</Card.Title>
                                        <Card.Text>{`$${articulo.precioVenta}`}</Card.Text>
                                        <hr />
                                        <p>
                                            {/*  
                                                {
                                                    !isInstrumentoInCarrito
                                                        ? <a style={{ marginLeft: '20px', marginRight: '16px' }}> </a>
                                                        : <a className='iconoMasMenos' onClick={() => removeItemCarrito(instrumento)}> - </a>
                                                }

                                                <Button className='colorFondoBlanco' onClick={toggleCarrito}>

                                                    {
                                                        isInstrumentoInCarrito
                                                            ? <Image src={`./img/deleteCart.png`} title='Quitar' />
                                                            : <Image src={`./img/addCart.png`} title='Comprar' />
                                                    }
                                                </Button>

                                                <a className='iconoMasMenos' onClick={() => addCarrito(instrumento)}>
                                                    +
                                                </a>
                                            */}
                                        </p>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}