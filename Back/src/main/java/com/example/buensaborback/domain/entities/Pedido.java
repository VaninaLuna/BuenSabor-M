package com.example.buensaborback.domain.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
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
private LocalTime horaEstimadaFinalizacion;
private double total;
private double totalCosto;
@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyy")
private LocalDate fechaPedido;

@OneToMany(mappedBy = "pedido",fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
@JsonManagedReference
private List<PedidoDetalle> pedidoDetalles = new ArrayList<>();
}
