package com.example.buensaborback.domain.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@SuperBuilder
public class Cliente extends Base{
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate fechaNacimiento;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "Cliente_domicilio",
            joinColumns = @JoinColumn(name = "Cliente_id"),
            inverseJoinColumns = @JoinColumn(name = "domicilio_id"))
    @Builder.Default
    private Set<Domicilio> domicilios = new HashSet<>();

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @Builder.Default
    @JsonIgnoreProperties("cliente")
    private Set<Pedido> pedidos = new HashSet<>();

    @OneToOne
    @ToString.Exclude
    @JoinColumn(name = "usuario_id")
    @JsonBackReference(value = "cliente_usuario")
    private UsuarioCliente usuario;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "imagen_id")
    private ImagenUsuario imagenUsuario;
}
