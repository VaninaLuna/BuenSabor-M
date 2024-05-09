package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Categoria;
import com.example.buensaborback.repositories.CategoriaRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class CategoriaServiceImpl implements CategoriaService{

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Override
    public List<Categoria> findAll() throws Exception {
        try{
            return categoriaRepository.findAll();
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Categoria findById(Long id) throws Exception {
        return categoriaRepository.findById(id).
                orElseThrow(() -> new NoSuchElementException("No exiaste una categoria"));
    }

}
