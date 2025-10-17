#help(str.split)


cursos= "Java, JavaScript, Python, C#, C++, Ruby, PHP"
lista_cursos = cursos.split(", ")
print(f"Lista_cursos: {lista_cursos}")
print(type(lista_cursos))



cursos_separados_con_coma= "Java,JavaScript,Python,C#,C++,Ruby,PHP"
lista_cursos = cursos_separados_con_coma.split(",", 2)
print(f"Lista cursos: {cursos_separados_con_coma}")
print(len(lista_cursos))