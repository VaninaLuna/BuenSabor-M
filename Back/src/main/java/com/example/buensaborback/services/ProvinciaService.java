package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Provincia;

import java.util.List;

public interface ProvinciaService extends BaseService<Provincia,Long> {

    List<Provincia> getPronviciasPorPais(Long id) throws Exception;
}
