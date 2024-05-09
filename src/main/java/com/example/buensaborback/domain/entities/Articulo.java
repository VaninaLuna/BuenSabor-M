package com.example.buensaborback.domain.entities;



import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@SuperBuilder
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Articulo extends Base{

//    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE)
//    protected Long id;
    protected String denominacion;
    protected Double precioVenta;


    //@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @OneToMany(mappedBy = "articulo", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    //@JoinColumn(name = "articulo_id") // Nombre de la columna en la tabla Imagen que referencia al Articulo
    @Builder.Default
    @JsonManagedReference
    protected Set<Imagen> imagenes = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "unidad_medida_id")
    protected UnidadMedida unidadMedida;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
}
