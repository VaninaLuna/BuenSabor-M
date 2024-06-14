package com.example.buensaborback.domain.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Builder
public class UnidadMedida extends Base{

    private String denominacion;
    private boolean eliminado;

//    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JoinColumn(name = "unidad_medida_id") // Nombre de la columna en la tabla Articulo que referencia a la unidad de medida
//    @Builder.Default
//    Set<Articulo> articulos = new HashSet<>();

}
