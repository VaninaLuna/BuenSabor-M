package com.example.buensaborback.controller;


import com.example.buensaborback.domain.entities.Rol;
import com.example.buensaborback.domain.entities.enums.RolName;
import com.example.buensaborback.services.RolService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rol")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class RolController {

    private final RolService rolService;

    @GetMapping("/all")
    public ResponseEntity<List<Rol>> getAll() {
        try {
            return ResponseEntity.ok(rolService.findAll());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/ByRolName/{rolName}")
    public ResponseEntity<Rol> getByRolName(@PathVariable String rolName) {
        try {
            return ResponseEntity.ok(rolService.findByRolName(RolName.valueOf(rolName)));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}