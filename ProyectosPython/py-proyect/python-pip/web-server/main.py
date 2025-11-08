import store
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()#Creamos nuestra primera instancia y con esto vamos a crear nuestro primer recurso

#Primera ruta
@app.get('/')#Decorador que indica que el siguiente metodo es un recurso y que responde a solicitudes GET en la ruta '/'
def get_list(): #Va a devolver una lista de numeros
    return[1, 2, 3]

#Segunda ruta
@app.get('/contact', response_class=HTMLResponse)#Indicamos que la respuesta va a ser HTML
def get_list():
    return """
    <h1>Hola soy una pagina de contacto</h1>
    <p>Soy un parrafo para que leas</p>
"""



def run():
    store.get_razas()

if __name__ == "__main__":
    run()   