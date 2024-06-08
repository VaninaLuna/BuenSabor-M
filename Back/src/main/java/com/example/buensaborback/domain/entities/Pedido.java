package com.example.buensaborback.domain.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @OneToMany(mappedBy = "pedido",fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<PedidoDetalle> pedidoDetalles = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    @JsonIgnoreProperties({"pedidos", "domicilios", "usuario"})
    private Cliente cliente;


}
