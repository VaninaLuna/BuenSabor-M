package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.UsuarioCliente;

import java.util.List;

public interface UsuarioService extends BaseService<UsuarioCliente, Long> {
    UsuarioCliente findByNombreUsuario(String nombreUsuario);
}
