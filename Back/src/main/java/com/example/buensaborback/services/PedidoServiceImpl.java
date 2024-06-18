package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.ArticuloInsumo;
import com.example.buensaborback.domain.entities.Pedido;
import com.example.buensaborback.dto.*;
import com.example.buensaborback.repositories.PedidoRepository;
import jakarta.persistence.Tuple;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PedidoServiceImpl extends BaseServiceImpl<Pedido,Long> implements PedidoService{
    private final PedidoRepository pedidoRepository;
    public PedidoServiceImpl(PedidoRepository pedidoRepository) {
        super(pedidoRepository);
        this.pedidoRepository = pedidoRepository;
    }

    @Transactional
    public List<Pedido> buscarPedidosByCliente(Long clienteId) throws Exception {
        try {
            return pedidoRepository.buscarPedidosByCliente(clienteId);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public List<Pedido> findByEstado(String estado) throws Exception {
        try{
            return pedidoRepository.findByEstado(estado);
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public List<Pedido> findByCocinero() throws Exception {
        try{
            return pedidoRepository.findByCocinero();
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public List<PedidoCocinaDTO> findPedidosByTiempoEstimado() throws Exception {
        try{
            return pedidoRepository.findPedidosByTiempoEstimado();
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public List<PedidosPorMesAnioDTO> findPedidosGroupedByMonthAndYear() throws Exception {
        try{
            return pedidoRepository.findPedidosGroupedByMonthAndYear();
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public List<PedidosPorArticuloDTO> findPedidosGroupedByArticulo() throws Exception {
        try{
            return pedidoRepository.findPedidosGroupedByArticulo();
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }
}
