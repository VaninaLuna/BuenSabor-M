package com.example.buensaborback.domain.entities;

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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "articulo_insumo_id")
    private ArticuloInsumo articuloInsumo;

    @ManyToOne
    @JoinColumn(name = "articulo_manufacturado_id")
    private ArticuloManufacturado articuloManufacturado;

//    @ManyToOne
//    @JoinColumn(name = "articuloInsumo_id")
//    private ArticuloInsumo articuloInsumo;

//    @ManyToOne
//    @JoinColumn(name = "articulo_manufacturado_id")
//    private ArticuloInsumo articuloInsumo;
}
