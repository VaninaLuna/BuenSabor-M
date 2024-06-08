package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Factura;
import com.example.buensaborback.repositories.FacturaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacturaServiceImpl extends BaseServiceImpl<Factura, Long> implements FacturaService {

    private FacturaRepository facturaRepository;
    public FacturaServiceImpl(FacturaRepository facturaRepository) {
        super(facturaRepository);
        this.facturaRepository = facturaRepository;
    }
}
