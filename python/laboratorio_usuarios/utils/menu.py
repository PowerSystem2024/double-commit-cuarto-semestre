from colorama import Fore, Style, init

init(autoreset=True)  # Para que los colores se reseteen automáticamente

def mostrar_menu():
    opciones = [
        "1) Listar usuarios",
        "2) Agregar usuario",
        "3) Actualizar usuario",
        "4) Eliminar usuario",
        "5) Salir"
    ]

    # Calcular el ancho del recuadro según la opción más larga
    max_length = max(len(op) for op in opciones)

    # Bordes del recuadro
    top_border = "┌" + "─" * (max_length + 2) + "┐"
    bottom_border = "└" + "─" * (max_length + 2) + "┘"

    # Construir el contenido
    contenido = "\n".join(f"│ {op.ljust(max_length)} │" for op in opciones)

    return (
        f"{Fore.GREEN}{Style.BRIGHT}"
        f"{top_border}\n"
        f"{contenido}\n"
        f"{bottom_border}"
    )

def menu_handler():
    while True:
        print(mostrar_menu())
        option = input(f"{Fore.CYAN}Seleccione una opción: {Style.RESET_ALL}")

        if option == "1":
            print("📋 Listando usuarios...")
            # usuarios = UsuarioDAO.listar()
        elif option == "2":
            print("➕ Agregando usuario...")
            # username = input("Ingrese el nombre: ")
            # password = input("Ingrese la contraseña: ")
            # usuario = Usuario(username, password)
            # UsuarioDAO.insertar(usuario)
        elif option == "3":
            print("✏️ Actualizando usuario...")
            # Implementación DAO
        elif option == "4":
            # Agregar implementación DAO
            print("🗑 Eliminando usuario...")
        elif option == "5":
            print("👋 Saliendo de la aplicación...")
            break
        else:
            print(f"{Fore.RED}❌ Opción inválida, intente de nuevo.{Style.RESET_ALL}")