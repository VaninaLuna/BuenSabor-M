package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.UsuarioCliente;
import com.example.buensaborback.domain.entities.enums.RolName;
import com.example.buensaborback.repositories.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

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

    @Override
    public List<UsuarioCliente> getEmpleados() throws Exception {
        try {
            var usuarios = usuarioRepository.findAll();

            // Filtrar los usuarios para incluir solo los que son cajero, cocinero o delivery
            var empleados = usuarios.stream()
                    .filter(usuario -> usuario.getRol().getRolName() == RolName.CAJERO
                            || usuario.getRol().getRolName() == RolName.COCINERO
                            || usuario.getRol().getRolName() == RolName.DELIVERY
                            || usuario.getRol().getRolName() == RolName.ADMIN)
                    .collect(Collectors.toList());

            return empleados;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public List<UsuarioCliente> getEmpleadosByRol(RolName rol) throws Exception {
        try {
            var usuarios = usuarioRepository.findAll();

            return usuarios.stream()
                    .filter(u -> Objects.equals(u.getRol().getRolName(), rol))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public List<UsuarioCliente> getClientes() throws Exception {
        try {
            var usuarios = usuarioRepository.findAll();

            // Filtrar los usuarios para incluir solo los que son clientes
            var clientes = usuarios.stream()
                    .filter(usuario -> usuario.getRol().getRolName() == RolName.CLIENTE)
                    .collect(Collectors.toList());

            return clientes;
        }catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}