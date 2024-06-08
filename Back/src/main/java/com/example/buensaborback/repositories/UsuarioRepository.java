package com.example.buensaborback.repositories;

import com.example.buensaborback.domain.entities.UsuarioCliente;

public interface UsuarioRepository extends BaseRepository<UsuarioCliente,Long>{
    UsuarioCliente findByNombreUsuario(String nombreUsuario);
}
