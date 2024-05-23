package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.Empresa;
import com.example.buensaborback.services.EmpresaServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/empresa")
@CrossOrigin(origins = "*")
public class EmpresaController extends BaseControllerImpl<Empresa, EmpresaServiceImpl> {
}
