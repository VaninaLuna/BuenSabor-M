package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.ArticuloInsumo;
import com.example.buensaborback.domain.entities.ArticuloManufacturado;
import com.example.buensaborback.repositories.ArticuloManufacturadoRepository;
import com.example.buensaborback.repositories.BaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticuloManufacturadoServiceImpl extends BaseServiceImpl<ArticuloManufacturado,Long> implements ArticuloManufacturadoService{

    private ArticuloManufacturadoRepository articuloManufacturadoRepository;
    public ArticuloManufacturadoServiceImpl(ArticuloManufacturadoRepository articuloManufacturadoRepository) {
        super(articuloManufacturadoRepository);
        this.articuloManufacturadoRepository = articuloManufacturadoRepository;
    }

    @Override
    public List<ArticuloManufacturado> findByEliminado(boolean eliminado) throws Exception {
        try{
            return articuloManufacturadoRepository.findByEliminado(eliminado);
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }
}
