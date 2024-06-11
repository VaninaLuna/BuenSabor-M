package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Provincia;
import com.example.buensaborback.domain.entities.enums.RolName;
import com.example.buensaborback.repositories.ProvinciaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProvinciaServiceImpl extends BaseServiceImpl<Provincia, Long> implements ProvinciaService {

    private ProvinciaRepository provinciaRepository;

    public ProvinciaServiceImpl(ProvinciaRepository provinciaRepository){
        super(provinciaRepository);
        this.provinciaRepository = provinciaRepository;
    }


    @Override
    public List<Provincia> getPronviciasPorPais(Long id) throws Exception {
        try {
            return provinciaRepository.getProvinciasPorPais(id);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }


}
