package utn.tienda_libros.domain;

public class Usuario {
    public int count = 0;
    private int id;
    private String nombre;
    private String correo;

    public Usuario() {}

    public Usuario(Integer id, String nombre, String correo) {
        this.id = ++Usuario.this.count;
        this.nombre = nombre;
        this.correo = correo;
    }

    @Override
    public String toString() {
        return """
                Usuario: {0}
                """.formatted(this.nombre);
    }
}
