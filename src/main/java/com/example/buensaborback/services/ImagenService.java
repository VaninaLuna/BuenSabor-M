package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Imagen;

import java.util.List;

public interface ImagenService {
    List<Imagen> findAll() throws Exception;
    Imagen findById(Long id) throws Exception;
}
