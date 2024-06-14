package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.ArticuloInsumo;
import com.example.buensaborback.domain.entities.UnidadMedida;

import java.util.List;

public interface UnidadMedidaService extends BaseService<UnidadMedida,Long>{

    List<UnidadMedida> findByEliminado(boolean eliminado) throws Exception;
}
