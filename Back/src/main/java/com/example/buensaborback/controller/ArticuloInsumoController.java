package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.ArticuloInsumo;
import com.example.buensaborback.services.ArticuloInsumoService;
import com.example.buensaborback.services.ArticuloInsumoServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

}
