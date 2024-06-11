package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Localidad;
import com.example.buensaborback.domain.entities.Provincia;
import com.example.buensaborback.repositories.LocalidadRepository;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocalidadServiceImpl extends BaseServiceImpl<Localidad, Long> implements LocalidadService {

    private LocalidadRepository localidadRepository;

    public LocalidadServiceImpl(LocalidadRepository localidadRepository){
        super(localidadRepository);
        this.localidadRepository = localidadRepository;
    }

    @Override
    public List<Localidad> getLocalidadesPorProvincia(Long id) throws Exception {
        try {
            return localidadRepository.getLocalidadesPorProvincia(id);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
