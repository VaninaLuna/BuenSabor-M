package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.ArticuloInsumo;

import java.util.List;

public interface ArticuloInsumoService {

    List<ArticuloInsumo> findAll() throws Exception;
    ArticuloInsumo findById(Long id) throws Exception;
    ArticuloInsumo save(ArticuloInsumo articuloInsumo) throws Exception;
    ArticuloInsumo update(Long id, ArticuloInsumo articuloInsumo) throws Exception;
    boolean delete(Long id) throws Exception;
}
