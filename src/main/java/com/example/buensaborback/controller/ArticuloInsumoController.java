package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.ArticuloInsumo;
import com.example.buensaborback.services.ArticuloInsumoService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/articuloInsumo")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class ArticuloInsumoController {

    private final ArticuloInsumoService articuloInsumoService;

    @GetMapping("/all")
    public ResponseEntity<List<ArticuloInsumo>> getAll() {
        try {
            return ResponseEntity.ok(articuloInsumoService.findAll());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticuloInsumo> getOne(@PathVariable Long id){
        try {
            return ResponseEntity.ok(articuloInsumoService.findById(id));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping
    public ResponseEntity<ArticuloInsumo> save(@RequestBody ArticuloInsumo articuloInsumo){
        try {
            return ResponseEntity.ok(articuloInsumoService.save(articuloInsumo));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArticuloInsumo> update(@PathVariable Long id, @RequestBody ArticuloInsumo articuloInsumo){
        try {
            return ResponseEntity.ok(articuloInsumoService.update(id,articuloInsumo));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(articuloInsumoService.delete(id));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }



}
