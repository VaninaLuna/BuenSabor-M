package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.Factura;
import com.example.buensaborback.services.FacturaServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/factura")
@CrossOrigin(origins = "*")
public class FacturaController extends BaseControllerImpl<Factura, FacturaServiceImpl> {
}
