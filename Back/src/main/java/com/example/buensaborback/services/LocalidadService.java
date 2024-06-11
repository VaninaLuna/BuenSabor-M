package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Localidad;

import java.util.List;

public interface LocalidadService extends BaseService<Localidad, Long> {

    List<Localidad> getLocalidadesPorProvincia(Long id) throws Exception;
}
