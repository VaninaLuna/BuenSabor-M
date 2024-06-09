package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Cliente;
import com.example.buensaborback.repositories.ClienteRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class ClienteServiceImpl extends BaseServiceImpl<Cliente,Long> implements ClienteService{

    private final ClienteRepository clienteRepository;

    public ClienteServiceImpl(ClienteRepository clienteRepository) {
        super(clienteRepository);
        this.clienteRepository = clienteRepository;
    }

    @Transactional
    public Cliente buscarClientePorIdUC(Long id) throws Exception {
        try {
            return clienteRepository.buscarClientePorIdUC(id);
        }catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
