package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Provincia;
import com.example.buensaborback.repositories.ProvinciaRepository;
import org.springframework.stereotype.Service;

@Service
public class ProvinciaServiceImpl extends BaseServiceImpl<Provincia, Long> implements ProvinciaService {

    private ProvinciaRepository provinciaRepository;

    public ProvinciaServiceImpl(ProvinciaRepository provinciaRepository){
        super(provinciaRepository);
        this.provinciaRepository = provinciaRepository;
    }
}
