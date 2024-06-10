package com.example.buensaborback.repositories;

import com.example.buensaborback.domain.entities.Rol;
import com.example.buensaborback.domain.entities.enums.RolName;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolRepository extends BaseRepository<Rol,Long>{
    Optional<Rol> findByRolName(RolName rolName);
}
