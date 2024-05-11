package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.ArticuloInsumo;
import com.example.buensaborback.domain.entities.UnidadMedida;

import java.util.List;

public interface UnidadMedidaService {
    List<UnidadMedida> findAll() throws Exception;
    UnidadMedida findById(Long id) throws Exception;
    UnidadMedida save(UnidadMedida unidadMedida) throws Exception;
    UnidadMedida update(Long id, UnidadMedida unidadMedida) throws Exception;
    boolean delete(Long id) throws Exception;
}
