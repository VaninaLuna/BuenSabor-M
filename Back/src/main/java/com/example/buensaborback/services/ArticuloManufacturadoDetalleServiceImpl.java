package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.ArticuloManufacturadoDetalle;
import com.example.buensaborback.repositories.ArticuloManufacturadoDetalleRepository;
import com.example.buensaborback.repositories.ArticuloManufacturadoRepository;
import com.example.buensaborback.repositories.BaseRepository;
import org.springframework.stereotype.Service;

@Service
public class ArticuloManufacturadoDetalleServiceImpl extends BaseServiceImpl<ArticuloManufacturadoDetalle,Long> implements ArticuloManufacturadoDetalleService{

    private ArticuloManufacturadoDetalleRepository articuloManufacturadoDetalleRepository;
    public ArticuloManufacturadoDetalleServiceImpl(ArticuloManufacturadoDetalleRepository articuloManufacturadoDetalleRepository) {
        super(articuloManufacturadoDetalleRepository);
        this.articuloManufacturadoDetalleRepository = articuloManufacturadoDetalleRepository;
    }
}
