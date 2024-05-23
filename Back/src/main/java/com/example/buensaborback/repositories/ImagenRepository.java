package com.example.buensaborback.repositories;

import com.example.buensaborback.domain.entities.Imagen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagenRepository extends BaseRepository<Imagen,Long> {
}
