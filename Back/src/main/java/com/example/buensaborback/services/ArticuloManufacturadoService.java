package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.ArticuloInsumo;
import com.example.buensaborback.domain.entities.ArticuloManufacturado;

import java.util.List;

public interface ArticuloManufacturadoService extends BaseService<ArticuloManufacturado,Long>{
    List<ArticuloManufacturado> findByEliminado(boolean eliminado) throws Exception;
}
