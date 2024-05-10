package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.ArticuloInsumo;
import com.example.buensaborback.domain.entities.ArticuloManufacturadoDetalle;

import java.util.List;

public interface ArticuloManufacturadoDetalleService {
    List<ArticuloManufacturadoDetalle> findAll() throws Exception;
    ArticuloManufacturadoDetalle findById(Long id) throws Exception;
    ArticuloManufacturadoDetalle save(ArticuloManufacturadoDetalle articuloManufacturadoDetalle) throws Exception;
    List<ArticuloManufacturadoDetalle> saveAll(List<ArticuloManufacturadoDetalle> articuloManufacturadoDetalleList) throws Exception;
}
