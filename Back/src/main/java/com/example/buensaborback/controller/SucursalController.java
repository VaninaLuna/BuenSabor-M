package com.example.buensaborback.controller;

import com.example.buensaborback.domain.entities.Sucursal;
import com.example.buensaborback.services.SucursalServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sucursal")
@CrossOrigin(origins = "*")
public class SucursalController extends BaseControllerImpl<Sucursal, SucursalServiceImpl> {
}
