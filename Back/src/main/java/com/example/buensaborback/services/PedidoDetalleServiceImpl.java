package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.PedidoDetalle;
import com.example.buensaborback.repositories.PedidoDetalleRepository;
import org.springframework.stereotype.Service;

@Service
public class PedidoDetalleServiceImpl extends BaseServiceImpl<PedidoDetalle,Long> {


    private PedidoDetalleRepository pedidoDetalleRepository;
    public PedidoDetalleServiceImpl(PedidoDetalleRepository pedidoDetalleRepository) {
        super(pedidoDetalleRepository);
        this.pedidoDetalleRepository = pedidoDetalleRepository;
    }
}
