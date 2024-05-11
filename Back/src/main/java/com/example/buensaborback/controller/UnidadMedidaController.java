package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.ArticuloInsumo;
import com.example.buensaborback.domain.entities.Categoria;
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

    @PostMapping
    public ResponseEntity<UnidadMedida> save(@RequestBody UnidadMedida unidadMedida){
        try {
            return ResponseEntity.ok(unidadMedidaService.save(unidadMedida));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UnidadMedida> update(@PathVariable Long id, @RequestBody UnidadMedida unidadMedida){
        try {
            return ResponseEntity.ok(unidadMedidaService.update(id,unidadMedida));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(unidadMedidaService.delete(id));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
