package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Categoria;
import com.example.buensaborback.repositories.BaseRepository;
import com.example.buensaborback.repositories.CategoriaRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CategoriaServiceImpl extends BaseServiceImpl<Categoria,Long> implements CategoriaService{

    private CategoriaRepository categoriaRepository;
    public CategoriaServiceImpl(CategoriaRepository categoriaRepository) {
        super(categoriaRepository);
        this.categoriaRepository = categoriaRepository;
    }

    @Override
    public List<Categoria> getCategoriasTree() {
        List<Categoria> rootCategorias = categoriaRepository.findByCategoriaPadreIsNull();
        return rootCategorias;
    }

    @Override
    public Categoria getCategoriaPadre(Long id) {
        return categoriaRepository.findCategoriaPadreById(id);
    }
}
