package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.UsuarioCliente;
import com.example.buensaborback.dto.LoginUsuarioDTO;
import com.example.buensaborback.repositories.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UsuarioCliente usuarioCliente) {
        usuarioCliente.setPassword(passwordEncoder.encode(usuarioCliente.getPassword()));
        usuarioRepository.save(usuarioCliente);
        return ResponseEntity.ok("Usuario registrado con éxito");
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioCliente> loginUser(@RequestBody LoginUsuarioDTO loginRequest) {
        UsuarioCliente usuarioCliente = usuarioRepository.findByNombreUsuario(loginRequest.getNombreUsuario());
        //.orElseThrow(() -> new NoSuchElementException("No existe un USUARIO con ese nombre"));
        if (usuarioCliente != null && passwordEncoder.matches(loginRequest.getPassword(), usuarioCliente.getPassword())) {
            return ResponseEntity.ok(usuarioCliente);
        } else {
            return ResponseEntity.status(401).body(new UsuarioCliente());
        }
    }
}