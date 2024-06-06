package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.Usuario;
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
    public ResponseEntity<String> registerUser(@RequestBody Usuario usuario) {
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        usuarioRepository.save(usuario);
        return ResponseEntity.ok("Usuario registrado con éxito");
    }

    @PostMapping("/login")
    public ResponseEntity<Usuario> loginUser(@RequestBody LoginUsuarioDTO loginRequest) {
        Usuario usuario = usuarioRepository.findByNombreUsuario(loginRequest.getNombreUsuario());
        //.orElseThrow(() -> new NoSuchElementException("No existe un USUARIO con ese nombre"));
        if (usuario != null && passwordEncoder.matches(loginRequest.getPassword(), usuario.getPassword())) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.status(401).body(new Usuario());
        }
    }
}