package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.ArticuloManufacturado;
import com.example.buensaborback.services.ArticuloManufacturadoService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/articuloManufacturado")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class ArticuloManufacturadoController {

    private final ArticuloManufacturadoService articuloManufacturadoService;

    @GetMapping("/all")
    public ResponseEntity<List<ArticuloManufacturado>> getAll() {
        try {
            return ResponseEntity.ok(articuloManufacturadoService.findAll());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticuloManufacturado> getOne(@PathVariable Long id){
        try {
            return ResponseEntity.ok(articuloManufacturadoService.findById(id));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping
    public ResponseEntity<ArticuloManufacturado> save(@RequestBody ArticuloManufacturado articuloManufacturado){
        try {
            return ResponseEntity.ok(articuloManufacturadoService.save(articuloManufacturado));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArticuloManufacturado> update(@PathVariable Long id, @RequestBody ArticuloManufacturado articuloManufacturado){
        try {
            return ResponseEntity.ok(articuloManufacturadoService.update(id,articuloManufacturado));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(articuloManufacturadoService.delete(id));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
