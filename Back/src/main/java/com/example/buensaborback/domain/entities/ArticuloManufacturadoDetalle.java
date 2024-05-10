package com.example.buensaborback.domain.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Builder
public class ArticuloManufacturadoDetalle extends Base {
    private Integer cantidad;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "articulo_insumo_id")
    private ArticuloInsumo articuloInsumo;

    @ManyToOne
    @JoinColumn(name = "articulo_manufacturado_id")
    @JsonBackReference
    private ArticuloManufacturado articuloManufacturado;

//    @ManyToOne
//    @JoinColumn(name = "articuloInsumo_id")
//    private ArticuloInsumo articuloInsumo;

//    @ManyToOne
//    @JoinColumn(name = "articulo_manufacturado_id")
//    private ArticuloInsumo articuloInsumo;
}
