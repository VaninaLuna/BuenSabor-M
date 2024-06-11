package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Factura;
import com.example.buensaborback.repositories.FacturaRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacturaServiceImpl extends BaseServiceImpl<Factura, Long> implements FacturaService {

    private final FacturaRepository facturaRepository;
    public FacturaServiceImpl(FacturaRepository facturaRepository) {
        super(facturaRepository);
        this.facturaRepository = facturaRepository;
    }

    @Transactional
    public List<Factura> buscarFacturasByCliente(Long clienteId) throws Exception {
        try {
            return facturaRepository.buscarFacturasByCliente(clienteId);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

}
