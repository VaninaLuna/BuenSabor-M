package com.example.buensaborback.domain.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
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
public class Cliente extends Base{
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate fechaNacimiento;

    @OneToOne(mappedBy = "cliente", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonManagedReference
    private Domicilio domicilio;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    @Builder.Default
    @JsonIgnoreProperties("cliente")
    private Set<Pedido> pedidos = new HashSet<>();

    @OneToOne
    @JoinColumn(name = "usuario_id")
    @JsonBackReference
    private UsuarioCliente usuario;

//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "imagen_id")
//    private ImagenUsuario imagenUsuario;
}
