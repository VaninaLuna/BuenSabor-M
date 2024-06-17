package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.Categoria;
import com.example.buensaborback.services.CategoriaServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categoria")
@CrossOrigin(origins = "*")
public class CategoriaController extends BaseControllerImpl<Categoria, CategoriaServiceImpl> {
    @GetMapping("/arbol")
    public ResponseEntity<List<Categoria>> getCategoriasTree() {
        List<Categoria> categoriasTree = servicio.getCategoriasTree();
        return new ResponseEntity<>(categoriasTree, HttpStatus.OK);
    }

    @GetMapping("/padre/{id}")
    public ResponseEntity<Categoria> getCategoriaPadre(@PathVariable Long id) {
        Categoria categoriaPadre = servicio.getCategoriaPadre(id);
        if (categoriaPadre == null) {
            return ResponseEntity.ok(new Categoria());
        }
        return ResponseEntity.ok(categoriaPadre);
    }

    @PutMapping("/cambiar_estado_eliminado/{id}")
    public ResponseEntity<?> cambiarEstadoEliminado(@PathVariable Long id) {
        try{
            var categoria = servicio.findById(id);
            if (categoria != null) {
                return ResponseEntity.ok(servicio.cambiarEstadoEliminado(id, !categoria.isEliminado()));
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Categoria no encontrada\"}");
        } catch (Exception e) {
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente luego\"}");
        }
    }
}
