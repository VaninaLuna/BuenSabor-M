package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.Localidad;
import com.example.buensaborback.services.LocalidadServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/localidad")
@CrossOrigin(origins = "*")
public class LocalidadController extends BaseControllerImpl<Localidad, LocalidadServiceImpl> {
}
