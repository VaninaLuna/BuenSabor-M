package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.ImagenPromocion;
import com.example.buensaborback.services.ImagenPromocionServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/imagenUsuario")
@CrossOrigin(origins = "*")
public class ImagenUsuarioController extends BaseControllerImpl<ImagenPromocion, ImagenPromocionServiceImpl>{
}
