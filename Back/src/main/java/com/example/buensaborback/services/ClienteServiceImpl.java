package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Cliente;
import com.example.buensaborback.repositories.ClienteRepository;
import org.springframework.stereotype.Service;

@Service
public class ClienteServiceImpl extends BaseServiceImpl<Cliente,Long> implements ClienteService{

    private ClienteRepository clienteRepository;

    public ClienteServiceImpl(ClienteRepository clienteRepository) {
        super(clienteRepository);
        this.clienteRepository = clienteRepository;
    }
}
