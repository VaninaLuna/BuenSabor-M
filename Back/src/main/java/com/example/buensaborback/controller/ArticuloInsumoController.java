package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.ArticuloInsumo;
import com.example.buensaborback.services.ArticuloInsumoServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/articuloInsumo")
@CrossOrigin(origins = "*")
public class ArticuloInsumoController extends BaseControllerImpl<ArticuloInsumo, ArticuloInsumoServiceImpl> {

    @GetMapping("/esParaElaborar/{esParaElaborar}")
    public ResponseEntity<?> getByEsParaElaborar(@PathVariable boolean esParaElaborar) {
        try {
            return ResponseEntity.ok(servicio.findByEsParaElaborar(esParaElaborar));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente luego\"}");
        }
    }

    @GetMapping("/esta_eliminado/{eliminado}")
    public ResponseEntity<?> gerByEstaEliminado(@PathVariable boolean eliminado) {
        try {
            return ResponseEntity.ok(servicio.findByEliminado(eliminado));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente luego\"}");
        }
    }

    @PutMapping("/cambiar_estado_eliminado/{id}")
    public ResponseEntity<?> cambiarEstadoEliminado(@PathVariable Long id) {
        try {
            var object = servicio.findById(id);

            object.setEliminado(!object.isEliminado());

            return ResponseEntity.ok(servicio.update(object.getId(), object));
        } catch (Exception e) {
            System.err.print(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Error. Por favor intente luego\"}");
        }
    }
}
