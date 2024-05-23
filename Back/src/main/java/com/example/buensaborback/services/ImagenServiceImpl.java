package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Imagen;
import com.example.buensaborback.repositories.BaseRepository;
import com.example.buensaborback.repositories.ImagenRepository;
import org.springframework.stereotype.Service;

@Service
public class ImagenServiceImpl extends BaseServiceImpl<Imagen,Long> implements ImagenService{

    private ImagenRepository imagenRepository;
    public ImagenServiceImpl(ImagenRepository imagenRepository) {
        super(imagenRepository);
        this.imagenRepository = imagenRepository;
    }
}
