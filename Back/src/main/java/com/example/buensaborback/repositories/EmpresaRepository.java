package com.example.buensaborback.repositories;

import com.example.buensaborback.domain.entities.Empresa;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends BaseRepository<Empresa,Long> {
}
