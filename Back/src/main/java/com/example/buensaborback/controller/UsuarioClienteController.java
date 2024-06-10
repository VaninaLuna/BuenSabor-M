package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.UsuarioCliente;
import com.example.buensaborback.services.UsuarioServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuario_cliente")
@CrossOrigin(origins = "*")
public class UsuarioClienteController extends BaseControllerImpl<UsuarioCliente, UsuarioServiceImpl> {


    @GetMapping("/empleados")
    public ResponseEntity<?> getEmpleados() {
        try {
            return ResponseEntity.ok(servicio.getEmpleados());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente luego\"}");
        }
    }

    @GetMapping("/clientes")
    public ResponseEntity<?> getClientes() {
        try {
            return ResponseEntity.ok(servicio.getClientes());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente luego\"}");
        }
    }
}
