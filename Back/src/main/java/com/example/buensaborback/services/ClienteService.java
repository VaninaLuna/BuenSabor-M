package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Cliente;

public interface ClienteService extends BaseService<Cliente,Long>{
    Cliente buscarClientePorIdUC(Long id) throws Exception ;
}
