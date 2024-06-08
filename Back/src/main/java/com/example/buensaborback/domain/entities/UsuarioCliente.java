package com.example.buensaborback.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UsuarioCliente extends Base{
    private String nombreUsuario;
    private String password;
    @ManyToOne
    @JoinColumn(name = "idRol")
    private Rol rol;

    public UsuarioCliente(String nombreUsuario, String password) {
        this.nombreUsuario = nombreUsuario;
        this.password = encryptPassword(password);
    }

    private String encryptPassword(String password) {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.encode(password);
    }

    @OneToOne(mappedBy = "usuario", fetch = FetchType.LAZY)
    private Cliente cliente;
}
