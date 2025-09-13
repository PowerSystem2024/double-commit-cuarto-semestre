package utn.estudiantes;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import utn.estudiantes.modelo.Estudiante;
import utn.estudiantes.servicio.EstudianteServicio;

import java.util.List;
import java.util.Scanner;

@SpringBootApplication
public class EstudiantesApplication implements CommandLineRunner {
    @Autowired
    private EstudianteServicio estudianteServicio;
    private static final Logger logger = LoggerFactory.getLogger(EstudiantesApplication.class);
    String nl = System.lineSeparator();

    public static void main(String[] args) {
        logger.info("Iniciando la aplicación...");
        // Levantar la fábrica de Spring
        SpringApplication.run(EstudiantesApplication.class, args);
        logger.info("Aplicación finalizada..");
    }

    @Override
    public void run(String... args) throws Exception {
        var salir = false;
        var consola = new Scanner(System.in);

        while (!salir) {
            mostrarMenu();
            salir = ejecutarOpciones(consola);
            logger.info(nl);
        }
        logger.info(nl + "Ejecutando el método run de Spring.." + nl);
    }

    private void mostrarMenu() {
        logger.info(nl);
        logger.info("""
                1. Listar estudiantes
                2. Buscar estudiante
                3. Agregar estudiante
                4. Eliminar estudiante
                5. Salir
                
                Elige una opción:
                """);
    }

    private boolean ejecutarOpciones(Scanner consola) {
            int opcion = Integer.parseInt(consola.nextLine());
            var salir = false;
            switch (opcion) {
                case 1 -> {
                    logger.info(nl+"Listado de estudiantes: " + nl);
                    List<Estudiante> estudiantes = estudianteServicio.listarEstudiantes();
                    estudiantes.forEach((estudiante) -> logger.info(estudiante.toString() + nl));
                }
                case 2 -> {
                    logger.info("Buscar estudiante por ID: " + nl);
                    try {
                        salir = true;
                        int idEstudiante = Integer.parseInt(consola.nextLine());
                        Estudiante estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
                        if (estudiante == null) {
                            logger.info("❌ El ID: " + idEstudiante + " no existe en la base de datos! Intente nuevamente." + nl);
                            logger.info("🔹 redirigiendo al menú principal..");
                            return false;
                        }
                        logger.info(estudiante.toString() + nl);
                        salir = false;
                    } catch (Exception e) {
                        logger.error(e.getMessage());
                    }
                }
                case 3 -> {
                    logger.info("Agregar estudiante"+nl);
                    try {
                        Estudiante estudiante = new Estudiante();
                        agregarEstudiante(estudiante, consola);
                    } catch (Exception e) {
                        logger.error(e.getMessage());
                    }
                }
                case 4 -> {
                    logger.info("Ingrese el ID del estudiante a eliminar: " + nl);
                    int idEstudiante = Integer.parseInt(consola.nextLine());
                    Estudiante estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
                    if (estudiante != null) {
                        estudianteServicio.eliminarEstudiante(estudiante);
                        logger.info("Estudiante eliminado con éxito: " + nl + estudiante);
                    } else {
                        logger.info("El ID: " + idEstudiante + " no existe. Compruebe en el siguiente listado...👇" + nl);
                        logger.info("Listado de estudiantes: " + nl);
                        estudianteServicio.listarEstudiantes().forEach(est -> logger.info(est.toString() + nl));
                        return false;
                    }
                }
                case 5 -> {
                    salir = true;
                    logger.info(nl + "Saliendo de la aplicación...👋");
                }
                default -> {
                    logger.info("Opción " + opcion + " inexistente. Vuelva a digitar la opción correcta!");
                }
            }
            return salir;
    }

    private void agregarEstudiante(Estudiante estudiante, Scanner consola) {
        logger.info("Ingrese el nombre del estudiante: "+nl);
        String nombre = consola.nextLine();
        estudiante.setNombre(nombre);
        logger.info("Ingrese el apellido del estudiante: "+nl);
        String apellido = consola.nextLine();
        estudiante.setApellido(apellido);
        logger.info("Ingrese el telefono del estudiante: "+nl);
        String telefono = consola.nextLine();
        estudiante.setTelefono(telefono);
        logger.info("Ingrese el email del estudiante: "+nl);
        String email = consola.nextLine();
        estudiante.setEmail(email);
        estudianteServicio.guardarEstudiante(estudiante);
        logger.info(nl+"✅ Se ha guardado el estudiante exitosamente: "+ nl+estudiante+nl);
    }
}
