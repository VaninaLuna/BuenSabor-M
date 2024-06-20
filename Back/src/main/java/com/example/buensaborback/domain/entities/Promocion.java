package com.example.buensaborback.domain.entities;

import com.example.buensaborback.domain.entities.enums.TipoPromocion;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
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
public class Promocion extends Base {

    private String denominacion;
    private LocalDate fechaDesde;
    private LocalDate fechaHasta;
    private LocalTime horaDesde;
    private LocalTime horaHasta;
    private String descripcionDescuento;
    private Double precioPromocional;
    private TipoPromocion tipoPromocion;

    @OneToMany(mappedBy = "promocion", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    @JsonManagedReference
    protected Set<ImagenPromocion> imagenes = new HashSet<>();

    @ManyToMany(cascade = CascadeType.REFRESH)
    @JoinTable(name = "promocion_sucursal",
            joinColumns = @JoinColumn(name = "promocion_id"),
            inverseJoinColumns = @JoinColumn(name = "sucursal_id"))
    @JsonIgnoreProperties({"domicilio", "promociones"})
    @Builder.Default
    private Set<Sucursal> sucursales = new HashSet<>();

    @OneToMany(mappedBy = "promocion", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    @JsonManagedReference
    private List<PromocionDetalle> promocionDetalles = new ArrayList<>();
}
