package com.example.buensaborback.controller;

import com.example.buensaborback.controller.mercadoPago.MercadoPagoController;
import com.example.buensaborback.controller.mercadoPago.PreferenceMP;
import com.example.buensaborback.domain.entities.Pedido;
import com.example.buensaborback.dto.PedidosPorMesAnioDTO;
import com.example.buensaborback.services.PedidoService;
import com.example.buensaborback.services.PedidoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedido")
@CrossOrigin(origins = "*")
public class PedidoController extends BaseControllerImpl<Pedido, PedidoServiceImpl>{

    @Autowired
    private PedidoService pedidoService;
    //----- MercadoPago Pedido
    @PostMapping("/create_preference_mp")
    public PreferenceMP crearPreferenciaMercadoPago(@RequestBody Pedido pedido) {
        var controllerMercadoPago = new MercadoPagoController();

        return controllerMercadoPago.getPreferenciaIdMercadoPago(pedido);
    }

    @GetMapping("/byCliente/{clienteId}")
    public ResponseEntity<?> getPedidosByCliente(@PathVariable Long clienteId) {
        try {
            return ResponseEntity.ok(pedidoService.buscarPedidosByCliente(clienteId));
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
}
