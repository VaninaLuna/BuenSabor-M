package com.example.buensaborback.controller;

import com.example.buensaborback.controller.mercadoPago.MercadoPagoController;
import com.example.buensaborback.controller.mercadoPago.PreferenceMP;
import com.example.buensaborback.domain.entities.*;
import com.example.buensaborback.dto.PedidosPorArticuloDTO;
import com.example.buensaborback.dto.PedidosPorMesAnioDTO;
import com.example.buensaborback.services.ArticuloInsumoService;
import com.example.buensaborback.services.PedidoService;
import com.example.buensaborback.services.PedidoServiceImpl;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedido")
@CrossOrigin(origins = "*")
public class PedidoController extends BaseControllerImpl<Pedido, PedidoServiceImpl> {

    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private ArticuloInsumoService articuloInsumoService;

    //----- MercadoPago Pedido
    @PostMapping("/create_preference_mp")
    public PreferenceMP crearPreferenciaMercadoPago(@RequestBody Pedido pedido) {
        var controllerMercadoPago = new MercadoPagoController();

        return controllerMercadoPago.getPreferenciaIdMercadoPago(pedido);
    }

    @PostMapping("/guardar_pedido")
    public ResponseEntity<?> guardarPedido(@RequestBody Pedido pedido) {
        try {

            for (PedidoDetalle pedidoDetalle : pedido.getPedidoDetalles()) {

                //Obtener la cantidad de articulosInsumo
                int cantidadDeArticulos = pedidoDetalle.getCantidad();

                Articulo articulo = pedidoDetalle.getArticulo();

                if (articulo instanceof ArticuloInsumo) {

                    //Obtener el articuloInsumo desde la BD
                    ArticuloInsumo articuloInsumo = articuloInsumoService.findById(articulo.getId());

                    // Se resta la cantidad de ese articulo insumo a su stock actual
                    articuloInsumo.setStockActual(articuloInsumo.getStockActual() - cantidadDeArticulos);

                    //Actualizar el stock del articulo insumo
                    articuloInsumoService.save(articuloInsumo);

                } else if (articulo instanceof ArticuloManufacturado articuloManufacturado) {

                    //Se obtienen los detalles del articulo manufacturado para saber
                    // los insumos que utiliza y las cantidades de los mismos
                    List<ArticuloManufacturadoDetalle> manufacturadoDetalles = articuloManufacturado.getArticuloManufacturadoDetalles();

                    for (var detalleManufacturado : manufacturadoDetalles) {

                        //Obtener la cantidad del articulo insumo que se utiliza
                        int cantidadInsumo = detalleManufacturado.getCantidad();

                        //Obtener el articuloInsumo desde la BD
                        ArticuloInsumo articuloInsumo = articuloInsumoService.findById(detalleManufacturado.getArticuloInsumo().getId());

                        // Se resta la cantidad de ese articulo insumo a su stock actual
                        articuloInsumo.setStockActual(articuloInsumo.getStockActual() - cantidadInsumo * cantidadDeArticulos);

                        //Actualizar el stock del articulo insumo
                        articuloInsumoService.save(articuloInsumo);
                    }
                }
            }
            //return ResponseEntity.ok(pedido);
            return ResponseEntity.ok(pedidoService.save(pedido));
        } catch (Exception e) {
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente luego\"}");
        }
    }

    @PostMapping("/actualizar_estado/{pedidoId}/{estado}")
    public ResponseEntity<?> actualizarEstadoPedido(@PathVariable Long pedidoId, @PathVariable String estado) {
        try {
            var pedido = pedidoService.findById(pedidoId);

            if (pedido != null) {
                pedido.setEstado(estado);

                return ResponseEntity.ok(pedidoService.update(pedido.getId(), pedido));
            }
        } catch (Exception e) {
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente luego\"}");
        }
    }

    @GetMapping("/byCliente/{clienteId}")
    public ResponseEntity<?> getPedidosByCliente(@PathVariable Long clienteId) {
        try {
            return ResponseEntity.ok(pedidoService.buscarPedidosByCliente(clienteId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente luego\"}");
        }
    }

    @GetMapping("/byEstado/{estado}")
    public ResponseEntity<?> getPedidosByEstado(@PathVariable String estado) {
        try {
            return ResponseEntity.ok(pedidoService.findByEstado(estado));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente luego\"}");
        }
    }

    @GetMapping("/porMesAnio")
    public List<PedidosPorMesAnioDTO> getPedidosPorMesAnio() {
        try {
            return pedidoService.findPedidosGroupedByMonthAndYear();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @GetMapping("/porArticulo")
    public List<PedidosPorArticuloDTO> findPedidosGroupedByArticulo() {
        try {
            return pedidoService.findPedidosGroupedByArticulo();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
