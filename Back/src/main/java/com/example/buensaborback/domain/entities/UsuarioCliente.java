package com.example.buensaborback.domain.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
public class UsuarioCliente extends Base{
    private String nombreUsuario;
    //private String password;
    @ManyToOne
    @JoinColumn(name = "idRol")
    private Rol rol;

    public UsuarioCliente(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
        //this.password = encryptPassword(password);
    }

//    private String encryptPassword(String password) {
//        PasswordEncoder encoder = new BCryptPasswordEncoder();
//        return encoder.encode(password);
//    }

    @OneToOne(mappedBy = "usuario", fetch = FetchType.LAZY)
    @Builder.Default
    @JsonManagedReference
    private Cliente cliente = new Cliente();
}
