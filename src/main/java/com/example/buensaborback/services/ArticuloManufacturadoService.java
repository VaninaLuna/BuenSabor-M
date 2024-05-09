package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.ArticuloInsumo;
import com.example.buensaborback.domain.entities.ArticuloManufacturado;

import java.util.List;

public interface ArticuloManufacturadoService {
    List<ArticuloManufacturado> findAll() throws Exception;
    ArticuloManufacturado findById(Long id) throws Exception;
    ArticuloManufacturado save(ArticuloManufacturado articuloManufacturado) throws Exception;
    ArticuloManufacturado update(Long id, ArticuloManufacturado articuloManufacturadorticuloManufacturado) throws Exception;
    boolean delete(Long id) throws Exception;
}
