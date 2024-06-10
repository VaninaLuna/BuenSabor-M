package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Rol;
import com.example.buensaborback.domain.entities.enums.RolName;
import com.example.buensaborback.repositories.RolRepository;
import org.springframework.stereotype.Service;

@Service
public class RolServiceImpl extends BaseServiceImpl<Rol, Long> implements RolService {
    private final RolRepository rolRepository;

    public RolServiceImpl(RolRepository rolRepository){
        super(rolRepository);
        this.rolRepository = rolRepository;
    }


    @Override
    public Rol findByRolName(RolName rolName) throws Exception {
        return rolRepository.findByRolName(rolName)
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));
    }
}
