package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Base;

import java.io.Serializable;
import java.util.List;

public interface BaseService<T extends Base, ID extends Serializable> {
    List<T> findAll() throws Exception;
    T findById(ID id) throws Exception;
    T save(T entity) throws Exception;
    T update(ID id,T entity) throws Exception;
    boolean delete(ID id) throws Exception;
}
