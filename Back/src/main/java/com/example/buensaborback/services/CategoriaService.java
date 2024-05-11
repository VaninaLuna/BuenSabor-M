package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Categoria;

import java.util.List;

public interface CategoriaService {
    List<Categoria> findAll() throws Exception;
    Categoria findById(Long id) throws Exception;
    Categoria save(Categoria categoria) throws Exception;
    Categoria update(Long id, Categoria categoria) throws Exception;
    boolean delete(Long id) throws Exception;
}
