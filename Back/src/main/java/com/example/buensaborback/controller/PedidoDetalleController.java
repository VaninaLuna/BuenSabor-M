package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.PedidoDetalle;
import com.example.buensaborback.services.PedidoDetalleServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pedidoDetalle")
@CrossOrigin(origins = "*")
public class PedidoDetalleController extends BaseControllerImpl<PedidoDetalle, PedidoDetalleServiceImpl>{
}
