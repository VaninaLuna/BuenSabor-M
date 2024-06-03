package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.Pedido;
import com.example.buensaborback.services.PedidoServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pedido")
@CrossOrigin(origins = "*")
public class PedidoController extends BaseControllerImpl<Pedido, PedidoServiceImpl>{
}
