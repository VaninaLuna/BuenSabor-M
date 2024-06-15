package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.ArticuloInsumo;
import com.example.buensaborback.domain.entities.UnidadMedida;
import com.example.buensaborback.repositories.ArticuloInsumoRepository;
import com.example.buensaborback.repositories.BaseRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticuloInsumoServiceImpl extends BaseServiceImpl<ArticuloInsumo, Long> implements ArticuloInsumoService{

    private ArticuloInsumoRepository articuloInsumoRepository;
    public ArticuloInsumoServiceImpl(ArticuloInsumoRepository articuloInsumoRepository) {
        super(articuloInsumoRepository);
        this.articuloInsumoRepository = articuloInsumoRepository;
    }

    @Override
    public List<ArticuloInsumo> findByEsParaElaborar(boolean esParaElaborar) throws Exception {
        try{
            return articuloInsumoRepository.findByEsParaElaborarAndEliminado(esParaElaborar,false);
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public List<ArticuloInsumo> findByEliminado(boolean eliminado) throws Exception {
        try{
            return articuloInsumoRepository.findByEliminado(eliminado);
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }
}
