package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.ArticuloInsumo;
import com.example.buensaborback.repositories.ArticuloInsumoRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class ArticuloInsumoImpl implements ArticuloInsumoService{

    @Autowired
    private ArticuloInsumoRepository articuloInsumoRepository;

    @Override
    public List<ArticuloInsumo> findAll() throws Exception {
        try{
            return articuloInsumoRepository.findAll();
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }


    @Override
    public ArticuloInsumo findById(Long id) throws Exception {
        return articuloInsumoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("No existe un articulo insumo con ese Id"));
    }


    @Override
    public ArticuloInsumo save(ArticuloInsumo articuloInsumo) throws Exception {
        try {
            return articuloInsumoRepository.save(articuloInsumo);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }



    @Override
    public ArticuloInsumo update(Long id, ArticuloInsumo articuloInsumo) throws Exception {
        try {
            if (!articuloInsumoRepository.existsById(id)) {
                throw new NoSuchElementException("No existe un articulo insumo con ese Id");
            }

            articuloInsumo.setId(id);
            return articuloInsumoRepository.save(articuloInsumo);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }


    @Override
    public boolean delete(Long id) throws Exception {
        try {
            if (!articuloInsumoRepository.existsById(id)) {
                throw new NoSuchElementException("No existe un articulo insumo con ese Id");
            }
                articuloInsumoRepository.deleteById(id);
                return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
