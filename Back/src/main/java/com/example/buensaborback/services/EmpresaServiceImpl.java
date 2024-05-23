package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Empresa;
import com.example.buensaborback.repositories.EmpresaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpresaServiceImpl extends BaseServiceImpl<Empresa, Long> implements EmpresaService {

    private EmpresaRepository empresaRepository;
    public EmpresaServiceImpl(EmpresaRepository empresaRepository){
        super(empresaRepository);
        this.empresaRepository = empresaRepository;
    }
}
