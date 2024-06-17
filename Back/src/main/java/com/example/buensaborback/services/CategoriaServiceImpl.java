package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Categoria;
import com.example.buensaborback.repositories.CategoriaRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    @Override
    public List<Categoria> findByEliminado(boolean eliminado) throws Exception {
        try{
            return categoriaRepository.findByEliminado(eliminado);
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public int cambiarEstadoEliminado(Long id, boolean estado) {
        Categoria categoria = categoriaRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Categoría no encontrada"));
        List<Categoria> todasLasCategorias = obtenerTodasLasSubcategorias(categoria);
        todasLasCategorias.add(categoria); // Incluye la categoría original
        for (Categoria cat : todasLasCategorias) {
            cat.setEliminado(estado);
        }
        var categoriasActualizadas = categoriaRepository.saveAll(todasLasCategorias); // Guarda todas las categorías actualizadas

        return categoriasActualizadas.size();
    }

    public List<Categoria> obtenerTodasLasSubcategorias(Categoria categoria) {
        List<Categoria> subCategorias = new ArrayList<>();
        obtenerSubcategoriasRecursivamente(categoria, subCategorias);
        return subCategorias;
    }

    private void obtenerSubcategoriasRecursivamente(Categoria categoria, List<Categoria> subCategorias) {
        for (Categoria subCategoria : categoria.getSubCategorias()) {
            subCategorias.add(subCategoria);
            obtenerSubcategoriasRecursivamente(subCategoria, subCategorias);
        }
    }

}
