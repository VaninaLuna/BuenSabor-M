package com.example.buensaborback.domain.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

    @ManyToOne
    @JoinColumn(name = "categoriaPadreId")
    private Categoria categoriaPadre;

    @Builder.Default
    @OneToMany(mappedBy = "categoriaPadre", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    private List<Categoria> subCategorias = new ArrayList<>();

//    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JoinColumn(name = "categoria_id") // Nombre de la columna en la tabla Articulo que referencia a la categoria
//    @Builder.Default
//    private Set<Articulo> articulos = new HashSet<>();
}
