package com.example.buensaborback.repositories;

import com.example.buensaborback.domain.entities.Provincia;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProvinciaRepository extends BaseRepository<Provincia, Long> {
        @Query("SELECT p FROM Provincia p WHERE p.pais.id = ?1")
        List<Provincia> getProvinciasPorPais(Long id);
}
