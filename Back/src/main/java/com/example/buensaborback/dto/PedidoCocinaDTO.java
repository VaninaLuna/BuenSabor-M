package com.example.buensaborback.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PedidoCocinaDTO {
    private Long pedidoId;
    private String estado;
    private Long pedidoDetalleId;
    private int cantidad;
    private Long articuloManufacturadoId;
    private Integer tiempoEstimadoMinutos;
}
