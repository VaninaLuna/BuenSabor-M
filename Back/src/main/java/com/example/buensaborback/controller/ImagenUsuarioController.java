package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.ImagenUsuario;
import com.example.buensaborback.services.ImagenUsuarioServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/imagenUsuario")
@CrossOrigin(origins = "*")
public class ImagenUsuarioController extends BaseControllerImpl<ImagenUsuario, ImagenUsuarioServiceImpl>{
}
