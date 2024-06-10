package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.UsuarioCliente;
import com.example.buensaborback.services.UsuarioServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuario_cliente")
@CrossOrigin(origins = "*")
public class UsuarioClienteController extends BaseControllerImpl<UsuarioCliente, UsuarioServiceImpl>{
}
