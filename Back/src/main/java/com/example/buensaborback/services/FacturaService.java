package com.example.buensaborback.services;

import com.example.buensaborback.domain.entities.Factura;

import java.io.ByteArrayOutputStream;
import java.util.List;

public interface FacturaService extends BaseService<Factura, Long>{
    List<Factura> buscarFacturasByCliente(Long clienteId) throws Exception ;

    //Genera un archivo PDF con los datos de la factura que recibe por parametro como id;
    void printPDF(Long id, ByteArrayOutputStream outputStream) throws Exception;
}
