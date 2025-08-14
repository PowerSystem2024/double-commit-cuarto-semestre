from psycopg2.pool import SimpleConnectionPool
from dotenv import load_dotenv

DB_USER = load_dotenv("DB_USER")
DB_PASSWORD = load_dotenv("DB_PASSWORD")

class Pool:
    _pool = None

    @classmethod
    def iniciar_pool(cls):
        if cls._pool is None:
            try:
                cls._pool = SimpleConnectionPool(
                    minconn=1,  # mínimo de conexiones abiertas
                    maxconn=5,  # máximo de conexiones abiertas
                    host="localhost",
                    user=DB_USER,
                    password=DB_PASSWORD,
                    port="5432",
                    database="laboratorio_usuarios",
                )
                print("Pool de conexiones creado correctamente")
                return cls._pool
            except Exception as e:
                print(f"Error al crear el pool de conexiones: {e}")
                raise
        return cls._pool

    @classmethod
    def obtener_conexion(cls):
        return cls.iniciar_pool().getconn()

    @classmethod
    def liberar_conexion(cls, conexion):
        cls.iniciar_pool().putconn(conexion)

    @classmethod
    def cerrar_todas(cls):
        cls.iniciar_pool().closeall()
