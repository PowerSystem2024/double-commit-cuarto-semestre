
#help(str.join)


tupla_str = ("hola", "mundo", "cruel")
mensaje = " ".join(tupla_str)
print(f"Mensaje: {mensaje}")


lista_cursos = ["Python", "Java", "JavaScript", "C#"]
mensaje2 = ", ".join(lista_cursos)
print(f"Mensaje: {mensaje}")

cadena = "HolaMundo"
mensaje = "-".join(cadena)
print(f"Mensaje: {mensaje}")


diccionario = {"nombre": "Juan", "apellido": "Pérez", "edad": "30"}

laves = "-".join(diccionario.keys())
valores = "-".join(diccionario.values())
print(f"Laves: {laves}, Type: {type(laves)}")
print(f"Valores: {valores}, Type: {type(valores)}")