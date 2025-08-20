from pool import Pool

class CursorDelPool:
    def __init__(self):
        self.conn = None
        self.cursor = None

    def __enter__(self):
        # Acá pedís la conexión al pool
        self.conn = Pool.obtener_conexion()
        self.cursor = self.conn.cursor()
        return self.cursor  # Devuelve el cursor para usar dentro del "with"

    def __exit__(self, tipo_excepcion, valor_excepcion, traceback):
        if valor_excepcion:
            self.conn.rollback()  # Deshace cambios si hubo error
        else:
            self.conn.commit()  # Guarda cambios si todo salió bien
        self.cursor.close()
        Pool.liberar_conexion(self.conn)  # Devuelve la conexión al pool
