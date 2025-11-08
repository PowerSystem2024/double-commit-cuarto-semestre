package utn.tienda_libros.vista;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import utn.tienda_libros.modelo.Libro;
import utn.tienda_libros.servicio.LibroServicio;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

@Component
public class LibroForm extends JFrame {
    LibroServicio libroServicio;
    private JPanel panel;
    private JTable tablaLibros;
    private JTextField libroTexto;
    private JTextField autorTexto;
    private JTextField precioTexto;
    private JTextField existenciasTexto;
    private JButton eliminarButton;
    private JButton modificarButton;
    private JButton agregarButton;
    private JLabel actualizacion;
    private JLabel totalLibros;
    private JLabel totalEstimado;
    private DefaultTableModel tablaModeloLibros;

    @Autowired
    public LibroForm(LibroServicio libroServicio){
        this.libroServicio = libroServicio;
        iniciarForma();
        actualizarFechayHora();
        actualizarTotalExistencias();
        actualizarTotalValorEstimado();
        agregarButton.addActionListener(e -> agregarLibro());
        eliminarButton.addActionListener(e -> eliminarLibro());
        modificarButton.addActionListener(e -> modificarLibro());
        tablaLibros.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                detectarSeleccionCelda();
            }
        });
    }

    private void iniciarForma(){
        setContentPane(panel);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setVisible(true);
        setSize(900, 700);
        // Para obtener las dimensiones de la ventana
        Toolkit toolkit = Toolkit.getDefaultToolkit();
        Dimension tamanioPantalla = toolkit.getScreenSize();
        int x = (tamanioPantalla.width - getWidth()/2);
        int y = (tamanioPantalla.height - getHeight()/2);
        setLocation(x, y);
    }

    private void agregarLibro(){
        // Leer los valores del formulario
        if (libroTexto.getText().isEmpty()) {
            mostrarMensaje("Ingresa el nombre del libro");
            libroTexto.requestFocusInWindow();
            return;
        }

        var nombreLibro = libroTexto.getText();
        var autor = autorTexto.getText();
        var precio = Double.parseDouble(precioTexto.getText());
        var existencias = Integer.parseInt(existenciasTexto.getText());
        // Creamos el objeto de libro
        var libro = new Libro(null, nombreLibro, autor, precio, existencias);

        this.libroServicio.guardarLibro(libro);
        mostrarMensaje("Se agrego el libro: " + libro.getNombreLibro() + ", Autor: " + libro.getAutor());
        limpiarFormulario();
        listarLibros();
    }

    private void modificarLibro() {
        String nombre = libroTexto.getText().trim();
        String autor = autorTexto.getText().trim();
        String precio = precioTexto.getText().trim();
        String existencias = existenciasTexto.getText().trim();
        Libro libro = detectarSeleccionCelda();

        if (nombre.isEmpty() || autor.isEmpty() || precio.isEmpty() || existencias.isEmpty()) {
            mostrarMensaje("""
            Para modificar un elemento, selecciona un libro en la tabla.
            Los campos se cargarán automáticamente para su edición.
            """);
            return;
        }

        if (libro == null) {
            mostrarMensaje("No se ha modificado ningún valor.");
            return;
        }

        try {
            libro.setNombreLibro(nombre);
            libro.setAutor(autor);
            libro.setPrecio(Double.parseDouble(precio));
            libro.setExistencias(Integer.parseInt(existencias));

            libroServicio.guardarLibro(libro);
            listarLibros();
            mostrarMensaje("¡Se ha modificado el libro correctamente!");
        } catch (NumberFormatException e) {
            mostrarMensaje("Error: el precio o las existencias no son valores válidos.");
        }
    }

    private Libro detectarSeleccionCelda() {
        int filaSeleccionada = tablaLibros.getSelectedRow();

        if (filaSeleccionada == -1) {
            return null;
        }

        var id = tablaLibros.getValueAt(filaSeleccionada, 0).toString();
        Libro libro = libroServicio.buscarLibroPorId(Integer.parseInt(id));

        if (libro == null) return null;

        // Si los campos coinciden exactamente con el libro seleccionado, no hay cambios
        boolean sinCambios =
                Objects.equals(libroTexto.getText(), libro.getNombreLibro()) &&
                        Objects.equals(autorTexto.getText(), libro.getAutor()) &&
                        Objects.equals(precioTexto.getText(), libro.getPrecio().toString()) &&
                        Objects.equals(existenciasTexto.getText(), libro.getExistencias().toString());

        if (sinCambios) {
            return null;
        }

        libroTexto.setText(libro.getNombreLibro());
        autorTexto.setText(libro.getAutor());
        precioTexto.setText(libro.getPrecio().toString());
        existenciasTexto.setText(libro.getExistencias().toString());

        return libro;
    }

    // Método que se creó antes para prácticas
//    private void modificarPorCelda(Libro libro, String nombreColumna, int fila, int columna) {
//        var valorCelda = tablaLibros.getValueAt(fila, columna).toString();
//        String nombreOriginal = libro.getNombreLibro();
//        String autorOriginal = libro.getAutor();
//        Double precioOriginal = libro.getPrecio();
//        var existenciasOriginal = libro.getExistencias().toString();
//
//        if (Objects.equals(valorCelda, nombreOriginal) || Objects.equals(valorCelda, autorOriginal)
//        || Objects.equals(valorCelda, precioOriginal.toString()) || Objects.equals(valorCelda, existenciasOriginal)) {
//            mostrarMensaje("Debe modificar una columna primero!");
//            return;
//        }
//        switch (nombreColumna) {
//            case "Libro" -> {
//                libro.setNombreLibro(valorCelda);
//            }
//            case "Autor" -> {
//                libro.setAutor(valorCelda);
//            }
//            case "Precio" -> {
//                libro.setPrecio(Double.parseDouble(valorCelda));
//            }
//            case "Existencias" -> {
//                libro.setExistencias(Integer.parseInt(valorCelda));
//            }
//        }
//
//        libroServicio.guardarLibro(libro);
//        mostrarMensaje("Se modificó la columna " + nombreColumna + " del libro " + libro.getNombreLibro());
//        listarLibros();
//    }

    private void eliminarLibro() {
        int filaSeleccionada = tablaLibros.getSelectedRow();

        if (filaSeleccionada == -1) {
            mostrarMensaje("Debe seleccionar un libro para eliminar.");
            return;
        }

        var id = tablaLibros.getValueAt(filaSeleccionada, 0);
        Libro libro = libroServicio.buscarLibroPorId(Integer.parseInt(id.toString()));

        int opcion = JOptionPane.showConfirmDialog(
                this,
                "¿Está seguro que desea eliminar el libro " + libro.getNombreLibro() + "?",
                "Confirmar eliminación",
                JOptionPane.YES_NO_OPTION,
                JOptionPane.QUESTION_MESSAGE
        );


        if (opcion == JOptionPane.NO_OPTION) {
            mostrarMensaje("Has cancelado eliminar el libro " + libro.getNombreLibro() + ".");
            return;
        }

        if (opcion == JOptionPane.CLOSED_OPTION) {
            mostrarMensaje("Se canceló la eliminación.");
            return;
        }

        libroServicio.eliminarLibro(libro);
        mostrarMensaje("Se eliminó el libro: " + libro.getNombreLibro() + ", " + libro.getAutor() + ".");
        listarLibros();
    }

    private void limpiarFormulario() {
        libroTexto.setText("");
        autorTexto.setText("");
        precioTexto.setText("");
        existenciasTexto.setText("");
    }

    private void mostrarMensaje(String mensaje) {
        JOptionPane.showMessageDialog(this, mensaje);
    }

    private void createUIComponents() {
        this.tablaModeloLibros = new DefaultTableModel(0, 5);
        String[] cabecera = {"Id", "Libro", "Autor", "Precio", "Existencias"};
        this.tablaModeloLibros.setColumnIdentifiers(cabecera);
        //Instanciar el objeto de JTable
        this.tablaLibros = new JTable(tablaModeloLibros){
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };
        // Evitamos que se seleccionen varios registros
        tablaLibros.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        listarLibros();
    }

    private void actualizarFechayHora() {
        if (this.actualizacion != null) {
            DateTimeFormatter formato = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
            String fechaHora = LocalDateTime.now().format(formato);
            this.actualizacion.setText("Última actualización BD: " + fechaHora);
        }
    }

    private void listarLibros() {
        // Limpiar la tabla
        tablaModeloLibros.setRowCount(0);
        // Obtener los libros de la BD
        var libros = libroServicio.listarLibros();
        // Iteramos cada libro
        libros.forEach((libro) -> {// Función Lambda
            // Creamos cada registro para agregarlos a la tabla
            Object [] renglonLibro = {
                    libro.getIdLibro(),
                    libro.getNombreLibro(),
                    libro.getAutor(),
                    libro.getPrecio(),
                    libro.getExistencias()
            };
            this.tablaModeloLibros.addRow(renglonLibro);
        });

        actualizarFechayHora();
        actualizarTotalExistencias();
        actualizarTotalValorEstimado();
    }

    private void actualizarTotalExistencias() {
        var libros = libroServicio.listarLibros();
        var total = libros.stream().mapToInt(Libro::getExistencias).sum();
        if (this.totalLibros != null) {
            totalLibros.setText("Total de existencias: " + total);
        }
    }

    private void actualizarTotalValorEstimado() {
        var libros = libroServicio.listarLibros();
        int totalExistencias = libros.stream().mapToInt(Libro::getExistencias).sum();
        double total = libros.stream().mapToDouble(Libro::getPrecio).sum();
        if (this.totalEstimado != null) {
            totalEstimado.setText("Total estimado: $" + total * totalExistencias);
        }
    }
}