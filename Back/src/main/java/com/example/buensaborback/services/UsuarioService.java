package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.UsuarioCliente;

import java.util.List;

public interface UsuarioService {
    List<UsuarioCliente> findAll() throws Exception;
    UsuarioCliente findById(Long id) throws Exception;
    UsuarioCliente findByNombreUsuario(String nombreUsuario) throws Exception;
    UsuarioCliente save(UsuarioCliente usuarioCliente) throws Exception;
    UsuarioCliente update(Long id, UsuarioCliente usuarioCliente) throws Exception;
    boolean delete(Long id) throws Exception;
}
