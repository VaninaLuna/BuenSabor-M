package com.example.buensaborback.repositories;

import com.example.buensaborback.domain.entities.UsuarioCliente;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UsuarioRepository extends BaseRepository<UsuarioCliente,Long>{
    UsuarioCliente findByNombreUsuario(String nombreUsuario);
}
