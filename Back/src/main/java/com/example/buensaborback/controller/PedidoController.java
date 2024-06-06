package com.example.buensaborback.controller;

import com.example.buensaborback.controller.mercadoPago.MercadoPagoController;
import com.example.buensaborback.controller.mercadoPago.PreferenceMP;
import com.example.buensaborback.domain.entities.Pedido;
import com.example.buensaborback.services.PedidoServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pedido")
@CrossOrigin(origins = "*")
public class PedidoController extends BaseControllerImpl<Pedido, PedidoServiceImpl>{

    //----- MercadoPago Pedido
    @PostMapping("/create_preference_mp")
    public PreferenceMP crearPreferenciaMercadoPago(@RequestBody Pedido pedido) {
        var controllerMercadoPago = new MercadoPagoController();

        return controllerMercadoPago.getPreferenciaIdMercadoPago(pedido);
    }

}
