package com.example.buensaborback.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PedidosPorMesAnioDTO {
    private int year;
    private int month;
    private long count;

}