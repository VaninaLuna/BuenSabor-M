package com.example.buensaborback.domain.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Builder
public class PromocionDetalle extends Base {

    private Integer cantidad;

    @ManyToOne
    @JoinColumn(name = "promocion_id")
    @JsonBackReference
    private Promocion promocion;
}
