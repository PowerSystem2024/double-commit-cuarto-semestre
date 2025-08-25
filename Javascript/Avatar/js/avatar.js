import { mostrarElemento } from "../../../docs/utils/elemento.mjs";

window.onload = () => {
    const gameState = {
        ataqueJugador: null,
        ataqueEnemigo: null,
        vidasJugador: 3,
        vidasEnemigo: 3,
        personajeSeleccionado: "",
        personajeEnemigo: "",
        personajes: [
            { id: "zuko", nombre: "Zuko🔥" },
            { id: "katara", nombre: "Katara💧" },
            { id: "aang", nombre: "Aang 🌬️" },
            { id: "toph", nombre: "Toph 🌍" }
        ],
        imagenes: {
            zuko: "../public/avatar-zuko.webp",
            katara: "../public/images.jpg",
            aang: "../public/images (1).jpg",
            toph: "../public/Toph_Beifong.webp"
        },
    };

    // Selectores
    const $ = (id) => document.getElementById(id);
    const botonPersonajeJugador = $("boton-personaje");
    const nombreJugador = $("nombre-jugador");
    const nombreEnemigo = $("nombre-enemigo");
    const botonPunio = $("boton-punio");
    const botonPatada = $("boton-patada");
    const botonBarrida = $("boton-barrida");
    const botonReiniciar = $("reiniciar");
    const mensajeFinal = $("mensaje-final");
    const seccionSeleccionarPersonaje = $("seccion-1");
    const reglasDelJuego = $("reglas");
    const botonReglas = $("ver-reglas");
    const cerrarReglas = $("cerrar-reglas");

    // Utilidades
    const aletarorio = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    // Inicialización
    reglasDelJuego.style.display = "none";
    botonReglas.onclick = () =>
        crearDialogo(reglasDelJuego.textContent, "⚠ Información del Juego");
    cerrarReglas.onclick = () => (reglasDelJuego.style.display = "none");

    // Selección de personaje
    function seleccionarPersonajeJugador() {
        const seleccion = gameState.personajes.find(
            (personaje) => $(personaje.id).checked
        );
        if (!seleccion) {
            alert("Por favor selecciona un personaje.");
            return;
        }
        gameState.personajeSeleccionado = seleccion.nombre;
        gameState.personajeSeleccionadoId = seleccion.id;

        // Selección de enemigo
        let enemigo;
        do {
            enemigo = gameState.personajes[aletarorio(0, gameState.personajes.length - 1)];
        } while (enemigo.id === seleccion.id);

        gameState.personajeEnemigo = enemigo.nombre;
        gameState.personajeEnemigoId = enemigo.id;


        // Ocultar y mostrar secciones
        seccionSeleccionarPersonaje.style.display = "none";
        $("vs-nombre-jugador").innerText = gameState.personajeSeleccionado;
        $("vs-img-jugador").src = gameState.imagenes[gameState.personajeSeleccionadoId];
        $("vs-nombre-enemigo").innerText = gameState.personajeEnemigo;
        $("vs-img-enemigo").src = gameState.imagenes[gameState.personajeEnemigoId];
        $("personajes-vs-enemigo").style.display = "block";
        $("seleccionar-ataque").style.display = "block";

        window.scrollTo({ top: 200, behavior: "smooth" });
        actualizarVidasUI();
    }

    // Ataques
    function ataqueJugador(tipo) {
        gameState.ataqueJugador = tipo;
        gameState.ataqueEnemigo = ataqueAleatorioEnemigo();
        procesarCombate();
    }

    function ataqueAleatorioEnemigo() {
        const ataques = ["Puño 👊", "Patada 🦵", "Barrida 🦶"];
        return ataques[aletarorio(0, ataques.length - 1)];
    }

    // Lógica de combate
    function procesarCombate() {
        if (gameState.vidasEnemigo <= 0 || gameState.vidasJugador <= 0) return;

        if (gameState.ataqueEnemigo === gameState.ataqueJugador) {
            crearDialogo(
                `${gameState.personajeSeleccionado} empató esta ronda con ${gameState.personajeEnemigo}`
            );
        } else if (
            (gameState.ataqueJugador === "Puño 👊" &&
                gameState.ataqueEnemigo === "Barrida 🦶") ||
            (gameState.ataqueJugador === "Barrida 🦶" &&
                gameState.ataqueEnemigo === "Patada 🦵") ||
            (gameState.ataqueJugador === "Patada 🦵" &&
                gameState.ataqueEnemigo === "Puño 👊")
        ) {
            crearDialogo(`${gameState.personajeSeleccionado} gana la ronda!`);
            gameState.vidasEnemigo--;
        } else {
            crearDialogo(
                `${gameState.personajeEnemigo} le ha ganado a ${gameState.personajeSeleccionado}. Pierdes una vida en esta ronda!`
            );
            gameState.vidasJugador--;
        }
        actualizarVidasUI();
        revisarVidas();
    }

    function actualizarVidasUI() {
        nombreJugador.textContent = `Tu personaje ${gameState.personajeSeleccionado} tiene ${gameState.vidasJugador} vidas`;
        nombreEnemigo.textContent = `El enemigo ${gameState.personajeEnemigo} tiene ${gameState.vidasEnemigo} vidas`;
    }

    function revisarVidas() {
        if (gameState.vidasJugador === 0) {
            crearDialogo(`${gameState.personajeEnemigo} ha ganado el combate. 😓`);
            deshabilitarBotones();
        } else if (gameState.vidasEnemigo === 0) {
            crearDialogo(`¡${gameState.personajeSeleccionado} ha ganado el combate! 🏆`);
            deshabilitarBotones();
        }
    }

    function deshabilitarBotones() {
        botonPunio.disabled = true;
        botonPatada.disabled = true;
        botonBarrida.disabled = true;
    }

    // Diálogo
    const crearDialogo = (contenido = "", titulo = "Resultado") => {
        const dialogo = document.createElement("dialog");
        dialogo.innerHTML = `
        <div>
            <header>
            <p>${titulo}</p>
            <span id="cerrar-dialogo" title="Cerrar diálogo" style="cursor: pointer;">✖</span>
            </header>
            <p style="padding: 24px">${contenido}</p>
        </div>
    `;
        document.body.appendChild(dialogo);
        dialogo.showModal();
        cerrarDialogo(dialogo);
    };

    const cerrarDialogo = (dialogo) => {
        const divDialogo = dialogo.querySelector("div");
        const botonCerrar = dialogo.querySelector("#cerrar-dialogo");
        dialogo.onclick = (event) => {
            if (!divDialogo.contains(event.target) || botonCerrar.contains(event.target)) {
                dialogo.close();
                dialogo.remove();
            }
        };
    };

    // Listeners
    botonPersonajeJugador.onclick = seleccionarPersonajeJugador;
    botonPunio.onclick = () => ataqueJugador("Puño 👊");
    botonPatada.onclick = () => ataqueJugador("Patada 🦵");
    botonBarrida.onclick = () => ataqueJugador("Barrida 🦶");
    botonReiniciar.onclick = () => window.location.reload();
};