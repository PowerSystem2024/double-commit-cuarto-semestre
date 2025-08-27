# Bool contine los valores de True y False
# Los tipos numéricos, es false para el 0 (cero), true para los demás valores
valor = 0
resultado = bool(valor)
print(f'Valor: {valor}, Resultado: {resultado}')

valor = -1
resultado = bool(valor)
print(f'Valor: {valor}, Resultado: {resultado}')

valor = 0.0
resultado = bool(valor)
print(f'Valor: {valor}, Resultado: {resultado}')

# Tipo String -> False '', True -> demás valores
valor = ''
resultado = bool(valor)
print(f'Valor: {valor}, Resultado: {resultado}')

valor = 'hola'
resultado = bool(valor)
print(f'Valor: {valor}, Resultado: {resultado}')
