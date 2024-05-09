package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.UnidadMedida;

import java.util.List;

public interface UnidadMedidaService {
    List<UnidadMedida> findAll() throws Exception;
    UnidadMedida findById(Long id) throws Exception;
}
