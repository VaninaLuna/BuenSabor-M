package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.ArticuloInsumo;
import com.example.buensaborback.domain.entities.UnidadMedida;
import com.example.buensaborback.services.ArticuloInsumoService;
import com.example.buensaborback.services.UnidadMedidaService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/unidadMedida")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class UnidadMedidaController {

    private final UnidadMedidaService unidadMedidaService;

    @GetMapping("/all")
    public ResponseEntity<List<UnidadMedida>> getAll() {
        try {
            return ResponseEntity.ok(unidadMedidaService.findAll());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UnidadMedida> getOne(@PathVariable Long id){
        try {
            return ResponseEntity.ok(unidadMedidaService.findById(id));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
