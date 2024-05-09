package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.ArticuloManufacturadoDetalle;
import com.example.buensaborback.repositories.ArticuloManufacturadoDetalleRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
@AllArgsConstructor
public class ArticuloManufacturadoDetalleImpl implements ArticuloManufacturadoDetalleService{

    private final ArticuloManufacturadoDetalleRepository articuloManufacturadoDetalleRepository;

    @Override
    public List<ArticuloManufacturadoDetalle> findAll() throws Exception {
        try{
            return articuloManufacturadoDetalleRepository.findAll();
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public ArticuloManufacturadoDetalle findById(Long id) throws Exception {
        return articuloManufacturadoDetalleRepository.findById(id).
                orElseThrow(() -> new NoSuchElementException("No existe un Articulo Manufacturado Detalle con ese id"));
    }
}
