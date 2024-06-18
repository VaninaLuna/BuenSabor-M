package com.example.buensaborback.domain.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Pedido extends Base{
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    private LocalTime horaEstimadaFinalizacion;
    private double total;
    private double totalCosto;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate fechaPedido;
    private String estado;

    @OneToMany(mappedBy = "pedido",fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<PedidoDetalle> pedidoDetalles = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    @JsonIgnoreProperties({"pedidos", "domicilios", "usuario"})
    private Cliente cliente;

    @OneToOne(mappedBy = "pedido", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @ToString.Exclude
    @JsonBackReference
    private Factura factura;
}
