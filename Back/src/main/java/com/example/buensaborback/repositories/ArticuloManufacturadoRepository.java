package com.example.buensaborback.repositories;

import com.example.buensaborback.domain.entities.ArticuloManufacturado;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticuloManufacturadoRepository extends BaseRepository<ArticuloManufacturado,Long> {
    List<ArticuloManufacturado> findByEliminado(boolean eliminado) throws Exception;
}
