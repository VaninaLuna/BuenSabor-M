package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Rol;
import com.example.buensaborback.domain.entities.enums.RolName;
import com.example.buensaborback.repositories.RolRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@Transactional
@AllArgsConstructor
public class RolServiceImpl implements RolService {
    private final RolRepository rolRepository;

    @Override
    public Rol findByRolName(RolName rolName) throws Exception {
        return rolRepository.findByRolName(rolName)
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));
    }

    @Override
    @Transactional
    public List<Rol> findAll() throws Exception {
        try{
            return rolRepository.findAll();
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }
}
