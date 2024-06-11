package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.Cliente;
import com.example.buensaborback.domain.entities.UsuarioCliente;
import com.example.buensaborback.dto.LoginUsuarioDTO;
import com.example.buensaborback.services.ClienteService;
import com.example.buensaborback.services.UsuarioService;
import com.example.buensaborback.services.UsuarioServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController extends BaseControllerImpl<UsuarioCliente, UsuarioServiceImpl>{

    @Autowired
    private UsuarioService usuarioService;
    private ClienteService clienteService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<UsuarioCliente> registerUser(@RequestBody UsuarioCliente usuarioCliente) throws Exception {
//        usuarioCliente.setPassword(passwordEncoder.encode(usuarioCliente.getPassword()));

        try {
            UsuarioCliente currentUsuarioCliente = usuarioService.findByNombreUsuario(usuarioCliente.getNombreUsuario());

            if (currentUsuarioCliente != null) {
                return ResponseEntity.ok(currentUsuarioCliente);
            } else {
                UsuarioCliente usuarioGuardado = usuarioService.save(usuarioCliente);

                Cliente cliente = usuarioGuardado.getCliente();
                cliente.setUsuario(usuarioGuardado);

                if(usuarioCliente.getCliente().getNombre() == null || usuarioCliente.getCliente().getNombre().isEmpty()){
                    cliente.setNombre(usuarioGuardado.getNombreUsuario());
                }

                Cliente clienteGuardado = clienteService.save(cliente);

                usuarioGuardado.setCliente(clienteGuardado);

                return ResponseEntity.ok(usuarioGuardado);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new UsuarioCliente());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioCliente> loginUser(@RequestBody LoginUsuarioDTO loginRequest){
        UsuarioCliente usuarioCliente = usuarioService.findByNombreUsuario(loginRequest.getNombreUsuario());
        if (usuarioCliente != null /*&& passwordEncoder.matches(loginRequest.getPassword(), usuarioCliente.getPassword())*/) {
            return ResponseEntity.ok(usuarioCliente);
        } else {
            return ResponseEntity.status(401).body(new UsuarioCliente());
        }
    }

    @PostMapping("/byUserName/{nombreUsuario}")
    public ResponseEntity<UsuarioCliente> getByUserName(@PathVariable String nombreUsuario) {
        UsuarioCliente usuarioCliente = usuarioService.findByNombreUsuario(nombreUsuario);
        if (usuarioCliente != null ) {
            return ResponseEntity.ok(usuarioCliente);
        } else {
            return ResponseEntity.status(401).body(new UsuarioCliente());
        }
    }
}