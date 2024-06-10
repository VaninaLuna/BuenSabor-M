package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.ImagenPromocion;
import com.example.buensaborback.repositories.ImagenPromocionRepository;
import org.springframework.stereotype.Service;

@Service
public class ImagenPromocionServiceImpl extends BaseServiceImpl<ImagenPromocion,Long> implements ImagenPromocionService {
    private ImagenPromocionRepository imagenPromocionRepository;
    public ImagenPromocionServiceImpl(ImagenPromocionRepository imagenPromocionRepository) {
        super(imagenPromocionRepository);
        this.imagenPromocionRepository = imagenPromocionRepository;
    }

}
