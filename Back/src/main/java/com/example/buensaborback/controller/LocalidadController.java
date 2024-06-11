package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.Localidad;
import com.example.buensaborback.services.LocalidadServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/localidad")
@CrossOrigin(origins = "*")
public class LocalidadController extends BaseControllerImpl<Localidad, LocalidadServiceImpl> {

    @GetMapping("/por_provincia/{id}")
    public ResponseEntity<?> getEmpleados(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(servicio.getLocalidadesPorProvincia(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente luego\"}");
        }
    }
}
