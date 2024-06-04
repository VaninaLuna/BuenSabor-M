import PedidoDetalle from "./PedidoDetalle";

export default class Pedido {
    id: number = 0;
    horaEstimadaFinalizacion: string = "";
    total: number = 0;
    totalCosto: number = 0;
    fechaPedido: string = "";
    pedidoDetalles: PedidoDetalle[] = [];

}