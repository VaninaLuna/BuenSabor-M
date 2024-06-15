package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.ArticuloInsumo;
import com.example.buensaborback.domain.entities.UnidadMedida;

import java.util.List;

public interface ArticuloInsumoService extends BaseService<ArticuloInsumo, Long> {
    List<ArticuloInsumo> findByEsParaElaborar(boolean esParaElaborar) throws Exception;
    List<ArticuloInsumo> findByEliminado(boolean eliminado) throws Exception;
}
