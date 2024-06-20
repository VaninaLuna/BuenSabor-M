package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Promocion;
import com.example.buensaborback.repositories.PromocionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromocionServiceImpl extends BaseServiceImpl<Promocion, Long> implements PromocionService {

    private PromocionRepository promocionRepository;
    public PromocionServiceImpl(PromocionRepository promocionRepository) {
        super(promocionRepository);
        this.promocionRepository = promocionRepository;
    }
}

