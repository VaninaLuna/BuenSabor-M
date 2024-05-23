package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.Pais;
import com.example.buensaborback.services.PaisServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pais")
@CrossOrigin(origins = "*")
public class PaisController extends BaseControllerImpl<Pais, PaisServiceImpl> {
}
