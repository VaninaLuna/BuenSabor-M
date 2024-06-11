package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.Provincia;
import com.example.buensaborback.services.ProvinciaServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/provincia")
@CrossOrigin(origins = "*")
public class ProvinciaController extends BaseControllerImpl<Provincia, ProvinciaServiceImpl> {

    @GetMapping("/por_pais/{id}")
    public ResponseEntity<?> getEmpleados(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(servicio.getPronviciasPorPais(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente luego\"}");
        }
    }
}
