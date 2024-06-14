import { Button, Table } from "react-bootstrap";
export function Promociones() {



    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'top', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
                <h1 style={{ marginTop: '20px', color: "whitesmoke" }}>Promociones</h1>
                <Button size="lg" style={{ margin: 20, backgroundColor: '#EE7F46', border: '#EE7F46' }}>
                    Crear Promocion
                </Button>

                <br />
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Denominacion</th>
                            <th>Fecha Desde</th>
                            <th>Fecha Hasta</th>
                            <th>Hora Desde</th>
                            <th>Hora Hasta</th>
                            <th>Descripcion de descuento</th>
                            <th>Precio Promocional</th>
                            <th>Tipo de Promocion</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody style={{ background: "whitesmoke" }}>
                        {/* <td>Cerveza 2x1</td>
                        <td>20/06</td>
                        <td>30/06</td>
                        <td>17:00</td>
                        <td>21:00</td>
                        <td>2X1 en cerveza tirada</td>
                        <td>$2000</td>
                        <td>Happy hour</td> */}
                    </tbody>
                </Table>
            </div>
        </>
    )
}