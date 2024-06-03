package com.example.buensaborback.repositories;

import com.example.buensaborback.domain.entities.ArticuloInsumo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticuloInsumoRepository extends BaseRepository<ArticuloInsumo,Long> {

    List<ArticuloInsumo> findByEsParaElaborar(boolean esParaElaborar) throws Exception;

}
