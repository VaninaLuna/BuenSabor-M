package com.example.buensaborback.domain.entities;

import com.example.buensaborback.domain.entities.enums.FormaPago;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Factura extends Base {

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate fechaFacturacion;
    private String mpPreferenceId;
    private double montoDescuento;
    private String formaPago;
    private Double totalVenta;
    private Double totalCosto;

    @OneToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;
}
