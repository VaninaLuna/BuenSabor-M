package com.example.buensaborback.domain.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Builder
public class Categoria extends Base {
    private String denominacion;

//    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JoinColumn(name = "categoria_id") // Nombre de la columna en la tabla Articulo que referencia a la categoria
//    @Builder.Default
//    private Set<Articulo> articulos = new HashSet<>();
}
