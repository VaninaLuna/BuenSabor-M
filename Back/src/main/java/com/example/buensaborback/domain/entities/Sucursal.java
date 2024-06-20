package com.example.buensaborback.domain.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Builder
public class Sucursal extends Base{

    private String nombre;
    private LocalTime horarioApertura;
    private LocalTime horarioCierre;
    private Boolean casaMatriz;

    @OneToOne()
    @JoinColumn(name = "domicilio_id")
    private Domicilio domicilio;

    @ManyToOne()
    @JoinColumn(name = "empresa_id")
    @JsonIgnoreProperties("sucursales")
    @JsonBackReference
    private Empresa empresa;
}
