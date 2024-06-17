package com.example.buensaborback.repositories;

import com.example.buensaborback.domain.entities.Categoria;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository extends BaseRepository<Categoria,Long> {
    List<Categoria> findByCategoriaPadreIsNull();
    List<Categoria> findByEliminado(boolean eliminado) throws Exception;

    @Query("SELECT c.categoriaPadre FROM Categoria c WHERE c.id = :id")
    Categoria findCategoriaPadreById(@Param("id") Long id);
}
