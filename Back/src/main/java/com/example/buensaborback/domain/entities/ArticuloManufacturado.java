package com.example.buensaborback.domain.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.envers.Audited;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@SuperBuilder
@Audited
public class ArticuloManufacturado extends Articulo{

    private String descripcion;
    private Integer tiempoEstimadoMinutos;
    private String preparacion;

    @OneToMany(mappedBy = "articuloManufacturado", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
//    @JoinColumn(name= "articulo_manufacturado_id")
    @Builder.Default
    @JsonManagedReference
    private List<ArticuloManufacturadoDetalle> articuloManufacturadoDetalles = new ArrayList<>();
}
