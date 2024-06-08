package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.Cliente;
import com.example.buensaborback.services.ClienteServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cliente")
@CrossOrigin(origins = "*")
public class ClienteController extends BaseControllerImpl<Cliente, ClienteServiceImpl>{
}
