package com.example.buensaborback.domain.entities;

import com.example.buensaborback.domain.entities.enums.RolName;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.envers.Audited;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Audited
public class Rol extends Base{
    private Long id;
    @Enumerated(EnumType.STRING)
    private RolName rolName;
}
