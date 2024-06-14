package com.example.buensaborback.repositories;

import com.example.buensaborback.domain.entities.UnidadMedida;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UnidadMedidaRepository extends BaseRepository<UnidadMedida,Long> {
    List<UnidadMedida> findByEliminado(boolean eliminado) throws Exception;
}
