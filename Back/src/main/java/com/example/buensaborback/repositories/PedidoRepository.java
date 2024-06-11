package com.example.buensaborback.repositories;

import com.example.buensaborback.domain.entities.Factura;
import com.example.buensaborback.domain.entities.Pedido;
import com.example.buensaborback.dto.PedidosPorMesAnioDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PedidoRepository extends BaseRepository<Pedido,Long> {

    @Query("SELECT p FROM Pedido p " +
            "INNER JOIN p.cliente c " +
            "WHERE c.id = :id")
    List<Pedido> buscarPedidosByCliente(@Param("id") Long id) throws Exception;

    List<Pedido> findByFechaPedidoBetween(LocalDate fechaDesde, LocalDate fechaHasta);

    @Query("SELECT new com.example.buensaborback.dto.PedidosPorMesAnioDTO(YEAR(p.fechaPedido), MONTH(p.fechaPedido), COUNT(p)) " +
            "FROM Pedido p GROUP BY YEAR(p.fechaPedido), MONTH(p.fechaPedido)")
    List<PedidosPorMesAnioDTO> findPedidosGroupedByMonthAndYear();
}
