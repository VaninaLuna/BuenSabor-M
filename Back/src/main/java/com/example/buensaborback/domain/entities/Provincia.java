package com.example.buensaborback.domain.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
public class Provincia extends Base {

    private String nombre;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "pais_id")
    @JsonBackReference
    private Pais pais;

    @OneToMany(mappedBy = "provincia", fetch = FetchType.EAGER)
    @Builder.Default
    @JsonManagedReference
    private Set<Localidad> localidades = new HashSet<>();
}
