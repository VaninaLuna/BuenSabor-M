package com.example.buensaborback.repositories;

import com.example.buensaborback.domain.entities.ArticuloInsumo;
import com.example.buensaborback.domain.entities.Pedido;
import com.example.buensaborback.dto.PedidoCocinaDTO;
import com.example.buensaborback.dto.PedidosPorArticuloDTO;
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
    List<Pedido> buscarPedidosByCliente(@Param("id") Long id);

    List<Pedido> findByEstado(String estado);

    @Query("SELECT p FROM Pedido p " +
            "WHERE (p.estado = 'Aprobado' OR p.estado = 'En Preparacion' OR p.estado = 'Listo')")
    List<Pedido> findByCocinero();

    @Query("SELECT new com.example.buensaborback.dto.PedidoCocinaDTO(" +
            "p.id, p.estado, pd.id, pd.cantidad, am.id, am.tiempoEstimadoMinutos) " +
            "FROM Pedido p " +
            "INNER JOIN p.pedidoDetalles pd " +
            "INNER JOIN pd.articulo a " +
            "INNER JOIN ArticuloManufacturado am ON am.id = a.id " +
            "WHERE p.estado = 'Aprobado' OR p.estado = 'En Preparacion'")
    List<PedidoCocinaDTO> findPedidosByTiempoEstimado();

    List<Pedido> findByFechaPedidoBetween(LocalDate fechaDesde, LocalDate fechaHasta);

    @Query("SELECT new com.example.buensaborback.dto.PedidosPorMesAnioDTO(YEAR(p.fechaPedido), MONTH(p.fechaPedido), COUNT(p)) " +
            "FROM Pedido p GROUP BY YEAR(p.fechaPedido), MONTH(p.fechaPedido)")
    List<PedidosPorMesAnioDTO> findPedidosGroupedByMonthAndYear();

    @Query("SELECT new com.example.buensaborback.dto.PedidosPorArticuloDTO(pd.articulo.denominacion, COUNT(pd)) " +
            "FROM PedidoDetalle pd GROUP BY pd.articulo.denominacion")
    List<PedidosPorArticuloDTO> findPedidosGroupedByArticulo();
}
