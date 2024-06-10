package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Rol;
import com.example.buensaborback.domain.entities.UsuarioCliente;
import com.example.buensaborback.repositories.RolRepository;
import com.example.buensaborback.repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class UsuarioServiceImpl extends BaseServiceImpl<UsuarioCliente, Long> implements UsuarioService{

    private final UsuarioRepository usuarioRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository){
        super(usuarioRepository);
        this.usuarioRepository = usuarioRepository;
    }


    @Override
    public UsuarioCliente findByNombreUsuario(String nombreUsuario){
        return usuarioRepository.findByNombreUsuario(nombreUsuario);
    }
}