package com.example.buensaborback.domain.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.envers.Audited;

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
@Audited
public class Categoria extends Base {
    private String denominacion;

    @ManyToOne
    @JoinColumn(name = "categoriaPadreId")
    @JsonBackReference("categoria-subCategorias")
    private Categoria categoriaPadre;

    @Builder.Default
    @OneToMany(mappedBy = "categoriaPadre", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("categoria-subCategorias")
    private List<Categoria> subCategorias = new ArrayList<>();
}
