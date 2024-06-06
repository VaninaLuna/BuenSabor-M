package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Rol;
import com.example.buensaborback.domain.entities.enums.RolName;

import java.util.List;

public interface RolService {
    Rol findByRolName(RolName rolName) throws Exception;
    List<Rol> findAll() throws Exception;
}
