package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.Provincia;
import com.example.buensaborback.services.ProvinciaServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/provincia")
@CrossOrigin(origins = "*")
public class ProvinciaController extends BaseControllerImpl<Provincia, ProvinciaServiceImpl> {
}
