package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.Cliente;
import com.example.buensaborback.domain.entities.Rol;
import com.example.buensaborback.domain.entities.UsuarioCliente;
import com.example.buensaborback.services.ClienteService;
import com.example.buensaborback.services.ClienteServiceImpl;
import com.example.buensaborback.services.RolService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@AllArgsConstructor
@RequestMapping("/cliente")
@CrossOrigin(origins = "*")
public class ClienteController extends BaseControllerImpl<Cliente, ClienteServiceImpl> {

    private final ClienteService clienteService;

    @GetMapping("/usuario_cliente_id/{id}")
    public ResponseEntity<?> buscarClientePorIdUC(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(clienteService.buscarClientePorIdUC(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente luego\"}");
        }
    }
}
