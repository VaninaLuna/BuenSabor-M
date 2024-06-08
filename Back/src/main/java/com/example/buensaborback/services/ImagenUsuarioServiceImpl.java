package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.ImagenUsuario;
import com.example.buensaborback.repositories.ImagenUsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class ImagenUsuarioServiceImpl extends BaseServiceImpl<ImagenUsuario,Long> implements ImagenUsuarioService{
    private ImagenUsuarioRepository imagenUsuarioRepository;
    public ImagenUsuarioServiceImpl(ImagenUsuarioRepository imagenUsuarioRepository) {
        super(imagenUsuarioRepository);
        this.imagenUsuarioRepository = imagenUsuarioRepository;
    }

}
