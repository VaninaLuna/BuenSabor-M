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

    @Override
    public Categoria save(Categoria categoria) throws Exception {
        try {
            return categoriaRepository.save(categoria);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Categoria update(Long id, Categoria categoria) throws Exception {
        try {
            if (!categoriaRepository.existsById(id)) {
                throw new NoSuchElementException("No existe un articulo insumo con ese Id");
            }

            categoria.setId(id);
            return categoriaRepository.save(categoria);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public boolean delete(Long id) throws Exception {
        try {
            if (!categoriaRepository.existsById(id)) {
                throw new NoSuchElementException("No existe un articulo insumo con ese Id");
            }
            categoriaRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

}
