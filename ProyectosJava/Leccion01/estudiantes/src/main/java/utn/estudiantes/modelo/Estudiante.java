package utn.estudiantes.modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
// Boilerplate - Repetitivo
@Data // Crea los métodos get y set
@NoArgsConstructor // Constructor vacío
@AllArgsConstructor // Constructor con todos los argumentos
@ToString // Método toString()
@Table(name = "estudiantes2024")
public class Estudiante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idestudiante2024;
    private String nombre;
    private String apellido;
    private String telefono;
    private String email;
}
