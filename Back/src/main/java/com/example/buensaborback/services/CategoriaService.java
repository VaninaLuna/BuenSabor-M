package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Categoria;

import java.util.List;

public interface CategoriaService extends BaseService<Categoria,Long> {
    List<Categoria> getCategoriasTree();
    Categoria getCategoriaPadre(Long id);
}
