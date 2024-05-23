package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.ArticuloManufacturado;
import com.example.buensaborback.domain.entities.Categoria;
import com.example.buensaborback.domain.entities.UnidadMedida;
import com.example.buensaborback.services.CategoriaService;
import com.example.buensaborback.services.CategoriaServiceImpl;
import com.example.buensaborback.services.UnidadMedidaService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categoria")
@CrossOrigin(origins = "*")
public class CategoriaController extends BaseControllerImpl<Categoria, CategoriaServiceImpl> {

}
