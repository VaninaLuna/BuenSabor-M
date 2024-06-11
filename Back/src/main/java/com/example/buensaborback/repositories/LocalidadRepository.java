package com.example.buensaborback.repositories;

import com.example.buensaborback.domain.entities.Localidad;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocalidadRepository extends BaseRepository<Localidad,Long> {
    @Query("SELECT l FROM Localidad l WHERE l.provincia.id = ?1")
    List<Localidad> getLocalidadesPorProvincia(Long id);
}
