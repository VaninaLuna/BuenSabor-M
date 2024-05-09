package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Imagen;
import com.example.buensaborback.repositories.ImagenRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class ImagenImpl implements ImagenService{

    @Autowired
    private ImagenRepository imagenRepository;

    @Override
    public List<Imagen> findAll() throws Exception {
        try{
            return imagenRepository.findAll();
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Imagen findById(Long id) throws Exception {
        return imagenRepository.findById(id).
                orElseThrow(() -> new NoSuchElementException("No existe una imagen con ese id"));
    }
}
