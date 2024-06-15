package com.example.buensaborback.repositories;

import com.example.buensaborback.domain.entities.ArticuloInsumo;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticuloInsumoRepository extends BaseRepository<ArticuloInsumo,Long> {
    List<ArticuloInsumo> findByEsParaElaborarAndEliminado(boolean esParaElaborar, boolean eliminado) throws Exception;
    List<ArticuloInsumo> findByEliminado(boolean eliminado) throws Exception;
}
