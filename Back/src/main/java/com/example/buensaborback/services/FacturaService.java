package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Factura;

import java.util.List;

public interface FacturaService extends BaseService<Factura, Long>{
    List<Factura> buscarFacturasByCliente(Long clienteId) throws Exception ;
}
