package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.UnidadMedida;
import com.example.buensaborback.repositories.UnidadMedidaRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class UnidadMedidaImpl implements UnidadMedidaService{

    @Autowired
    private UnidadMedidaRepository unidadMedidaRepository;

    @Override
    public List<UnidadMedida> findAll() throws Exception {
        try{
            return unidadMedidaRepository.findAll();
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public UnidadMedida findById(Long id) throws Exception {
        return unidadMedidaRepository.findById(id).
                orElseThrow(() -> new NoSuchElementException("No existe una unidad de medida con ese id"));
    }
}
