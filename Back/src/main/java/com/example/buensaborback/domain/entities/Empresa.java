package com.example.buensaborback.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
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
public class Empresa extends Base{

    private String nombre;
    private String razonSocial;
    private String cuil;

    @OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @Builder.Default
    @JsonIgnoreProperties("empresa")
    private Set<Sucursal> sucursales = new HashSet<>();
}
