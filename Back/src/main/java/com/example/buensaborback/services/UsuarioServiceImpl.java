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
@Transactional
@AllArgsConstructor
public class UsuarioServiceImpl implements UsuarioService{

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;

    @Override
    public List<UsuarioCliente> findAll() throws Exception {
        try{
            return usuarioRepository.findAll();
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public UsuarioCliente findById(Long id) throws Exception {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("No existe un usuario con ese Id"));
    }

    @Override
    public UsuarioCliente findByNombreUsuario(String nombreUsuario) throws Exception {
        return usuarioRepository.findByNombreUsuario(nombreUsuario);
    }

    @Override
    public UsuarioCliente save(UsuarioCliente usuarioCliente) throws Exception {
        try {
            Rol rol = rolRepository.findByRolName(usuarioCliente.getRol().getRolName())
                    .orElseThrow(() -> new RuntimeException("Rol no encontrado"));
            usuarioCliente.setRol(rol);
            return usuarioRepository.save(usuarioCliente);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public UsuarioCliente update(Long id, UsuarioCliente usuarioCliente) throws Exception {
        try {
            if (!usuarioRepository.existsById(id)) {
                throw new NoSuchElementException("No existe un usuario con ese Id");
            }
            usuarioCliente.setId(id);
            return usuarioRepository.save(usuarioCliente);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public boolean delete(Long id) throws Exception {
        try {
            if (!usuarioRepository.existsById(id)) {
                throw new NoSuchElementException("No existe un usuario con ese Id");
            }
            usuarioRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}