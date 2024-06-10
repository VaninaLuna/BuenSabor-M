package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Rol;
import com.example.buensaborback.domain.entities.enums.RolName;


public interface RolService extends BaseService<Rol, Long>{
    Rol findByRolName(RolName rolName) throws Exception;
}
