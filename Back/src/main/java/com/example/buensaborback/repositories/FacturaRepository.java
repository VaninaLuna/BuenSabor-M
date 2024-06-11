package com.example.buensaborback.repositories;

import com.example.buensaborback.domain.entities.Factura;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacturaRepository extends BaseRepository<Factura, Long> {
    @Query("SELECT f FROM Factura f " +
            "INNER JOIN f.pedido p " +
            "INNER JOIN p.cliente c " +
            "WHERE c.id = :id")
    List<Factura> buscarFacturasByCliente(@Param("id") Long id) throws Exception;
}
