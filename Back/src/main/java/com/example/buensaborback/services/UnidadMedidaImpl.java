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

    @Override
    public UnidadMedida save(UnidadMedida unidadMedida) throws Exception {
        try {
            return unidadMedidaRepository.save(unidadMedida);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public UnidadMedida update(Long id, UnidadMedida unidadMedida) throws Exception {
        try {
            if (!unidadMedidaRepository.existsById(id)) {
                throw new NoSuchElementException("No existe un articulo insumo con ese Id");
            }

            unidadMedida.setId(id);
            return unidadMedidaRepository.save(unidadMedida);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public boolean delete(Long id) throws Exception {
        try {
            if (!unidadMedidaRepository.existsById(id)) {
                throw new NoSuchElementException("No existe un articulo insumo con ese Id");
            }
            unidadMedidaRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
