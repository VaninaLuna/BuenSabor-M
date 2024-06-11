package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.Cliente;
import com.example.buensaborback.domain.entities.UsuarioCliente;
import com.example.buensaborback.services.ClienteService;
import com.example.buensaborback.services.UsuarioServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuario_cliente")
@CrossOrigin(origins = "*")
public class UsuarioClienteController extends BaseControllerImpl<UsuarioCliente, UsuarioServiceImpl> {

    @Autowired
    private ClienteService clienteService;

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

    @PutMapping()
    public ResponseEntity<Cliente> updateData(@RequestBody UsuarioCliente usuarioCliente) throws Exception {
        try{
            Cliente cliente = usuarioCliente.getCliente();
            cliente.setUsuario(usuarioCliente);
            Cliente clienteGuardado = clienteService.save(cliente);

            return ResponseEntity.ok(clienteGuardado);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Cliente());
        }
    }
}
