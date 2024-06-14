package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Base;
import com.example.buensaborback.repositories.BaseRepository;
import jakarta.transaction.Transactional;

import java.io.Serializable;
import java.util.List;
import java.util.NoSuchElementException;

public class BaseServiceImpl<T extends Base, ID extends Serializable> implements BaseService<T, ID> {

    protected BaseRepository<T,ID> baseRepository;

    public BaseServiceImpl(BaseRepository<T, ID> baseRepository)
    {
        this.baseRepository = baseRepository;
    }

    @Override
    @Transactional
    public List<T> findAll() throws Exception {
        try {
            return baseRepository.findAll();
        }catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }


    @Override
    @Transactional
    public T findById(ID id) throws Exception {

        return baseRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("No existe un registro con ese Id"));
    }

    @Override
    @Transactional
    public T save(T entity) throws Exception {
        try {
            entity = baseRepository.save(entity);
            return entity;
        }catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public T update(ID id, T entity) throws Exception {
        try {
            if (!baseRepository.existsById(id)) {
                throw new NoSuchElementException("No existe un registro con ese Id");
            }

            entity.setId((long) id);

            return baseRepository.save(entity);
        }catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public boolean delete(ID id) throws Exception {
        try {
            if (!baseRepository.existsById(id)) {
                throw new NoSuchElementException("No existe un elemento con ese Id");
            }

            baseRepository.deleteById(id);
            return true;
        }catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
