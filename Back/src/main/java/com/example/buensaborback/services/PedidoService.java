package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Pedido;
import com.example.buensaborback.dto.PedidosPorMesAnioDTO;

import java.util.List;

public interface PedidoService extends BaseService<Pedido,Long>{
    List<Pedido> buscarPedidosByCliente(Long clienteId) throws Exception ;
    List<PedidosPorMesAnioDTO> findPedidosGroupedByMonthAndYear() throws Exception;
}
