package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.ArticuloManufacturado;
import com.example.buensaborback.repositories.ArticuloManufacturadoRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class ArticuloManufacturadoImpl implements ArticuloManufacturadoService{

    @Autowired
    private ArticuloManufacturadoRepository articuloManufacturadoRepository;

    @Override
    public List<ArticuloManufacturado> findAll() throws Exception {
        try{
            return articuloManufacturadoRepository.findAll();
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public ArticuloManufacturado findById(Long id) throws Exception {
        return articuloManufacturadoRepository.findById(id).
                orElseThrow(() -> new NoSuchElementException("No existe un Articulo Manufacturado con ese id"));
    }

    @Override
    public ArticuloManufacturado save(ArticuloManufacturado articuloManufacturado) throws Exception {
        try {
            return articuloManufacturadoRepository.save(articuloManufacturado);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public ArticuloManufacturado update(Long id, ArticuloManufacturado articuloManufacturado) throws Exception {
        try {
            if (!articuloManufacturadoRepository.existsById(id)) {
                throw new NoSuchElementException("No existe un Articulo Manufacturado con ese Id");
            }

            articuloManufacturado.setId(id);
            return articuloManufacturadoRepository.save(articuloManufacturado);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }


    @Override
    public boolean delete(Long id) throws Exception {
        try {
            if (!articuloManufacturadoRepository.existsById(id)) {
                throw new NoSuchElementException("No existe un Articulo Manufacturado con ese Id");
            }

            articuloManufacturadoRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());

        }
    }
}
