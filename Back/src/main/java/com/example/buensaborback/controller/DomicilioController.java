package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.Domicilio;
import com.example.buensaborback.services.DomicilioServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/domicilio")
@CrossOrigin(origins = "*")
public class DomicilioController extends BaseControllerImpl<Domicilio, DomicilioServiceImpl> {
}
