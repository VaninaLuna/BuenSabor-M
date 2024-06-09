package com.example.buensaborback.repositories;

import com.example.buensaborback.domain.entities.Cliente;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ClienteRepository extends BaseRepository<Cliente,Long>{

    @Query("SELECT c FROM Cliente c WHERE c.usuario.id = :usuario_id")
    Cliente buscarClientePorIdUC(@Param("usuario_id") Long usuario_id);

}
