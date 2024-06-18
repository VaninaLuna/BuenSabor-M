package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.ArticuloInsumo;
import com.example.buensaborback.domain.entities.Pedido;
import com.example.buensaborback.dto.PedidoCocinaDTO;
import com.example.buensaborback.dto.PedidosPorArticuloDTO;
import com.example.buensaborback.dto.PedidosPorMesAnioDTO;

import java.util.List;

public interface PedidoService extends BaseService<Pedido,Long>{
    List<Pedido> buscarPedidosByCliente(Long clienteId) throws Exception ;
    List<Pedido> findByEstado(String estado) throws Exception;
    List<Pedido> findByCocinero() throws Exception;
    List<PedidoCocinaDTO> findPedidosByTiempoEstimado() throws Exception;
    List<PedidosPorMesAnioDTO> findPedidosGroupedByMonthAndYear() throws Exception;
    List<PedidosPorArticuloDTO> findPedidosGroupedByArticulo()throws Exception;

}
