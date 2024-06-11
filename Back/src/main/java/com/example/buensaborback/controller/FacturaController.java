package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.Factura;
import com.example.buensaborback.services.ClienteService;
import com.example.buensaborback.services.FacturaService;
import com.example.buensaborback.services.FacturaServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/factura")
@CrossOrigin(origins = "*")
public class FacturaController extends BaseControllerImpl<Factura, FacturaServiceImpl> {

    private final FacturaService facturaService;

    @GetMapping("/byCliente/{clienteId}")
    public ResponseEntity<?> getFacturasByCliente(@PathVariable Long clienteId) {
        try {
            return ResponseEntity.ok(facturaService.buscarFacturasByCliente(clienteId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente luego\"}");
        }
    }
}
