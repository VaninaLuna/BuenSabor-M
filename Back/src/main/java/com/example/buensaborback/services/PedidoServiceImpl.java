package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Pedido;
import com.example.buensaborback.dto.PedidosPorArticuloDTO;
import com.example.buensaborback.dto.PedidosPorMesAnioDTO;
import com.example.buensaborback.repositories.PedidoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

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
