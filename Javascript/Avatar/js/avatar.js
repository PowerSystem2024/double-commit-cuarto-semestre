import { crearDialogo } from "../utils/dialog.mjs";

window.onload = () => {
  const gameState = {
    ataqueJugador: null,
    ataqueEnemigo: null,
    vidasJugador: 3,
    corazonesJugador: ["💖", "💖", "💖"],
    vidasEnemigo: 3,
    corazonesEnemigo: ["💖", "💖", "💖"],
    personajeSeleccionado: "",
    personajeEnemigo: "",
    personajes: [
      { id: "zuko", nombre: "Zuko" },
      { id: "katara", nombre: "Katara" },
      { id: "aang", nombre: "Aang" },
      { id: "toph", nombre: "Toph" },
    ],
    imagenes: {
      zuko: "../public/avatar-zuko.webp",
      katara: "../public/images.jpg",
      aang: "../public/images (1).jpg",
      toph: "../public/Toph_Beifong.webp",
    },
    cardBg: {
      zuko: "../public/zuko-bg-card.jpg",
      katara: "../public/katara-bg-card.jpg",
      aang: "../public/aang-bg-card.jpg",
      toph: "../public/toph-bg-card.jpg",
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
  const h2Eleccion = $("h2-eleccion");
  const tituloHeader = $("titulo-header");

  // Utilidades
  const aletarorio = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  // Inicialización
  reglasDelJuego.style.display = "none";
  botonReglas.onclick = () =>
    crearDialogo(reglasDelJuego.textContent, "Información del Juego");
  cerrarReglas.onclick = () => (reglasDelJuego.style.display = "none");

  // Selección de personaje
  function seleccionarPersonajeJugador() {
    const seleccion = gameState.personajes.find(
      (personaje) => $(personaje.id).checked
    );

    if (!seleccion) {
      crearDialogo("Por favor selecciona un personaje.", "Información");
      return;
    }

    botonReiniciar.style.display = "flex";
    h2Eleccion.style.display = "none";
    tituloHeader.style.transition = "0.6s ease-in-out";
    tituloHeader.style.scale = "0.8";
    $("seleccionar-ataque").style.animation = "slideOut 0.4s ease-in-out";
    botonPersonajeJugador.style.display = "none";
    gameState.personajeSeleccionado = seleccion.nombre;
    gameState.personajeSeleccionadoId = seleccion.id;

    // Selección de enemigo
    let enemigo;
    do {
      enemigo =
        gameState.personajes[aletarorio(0, gameState.personajes.length - 1)];
    } while (enemigo.id === seleccion.id);

    gameState.personajeEnemigo = enemigo.nombre;
    gameState.personajeEnemigoId = enemigo.id;

    // Ocultar y mostrar secciones
    seccionSeleccionarPersonaje.style.display = "none";
    $("vs-nombre-jugador").innerText = gameState.personajeSeleccionado;
    $("vs-img-jugador").src =
      gameState.imagenes[gameState.personajeSeleccionadoId];
    $("vs-nombre-enemigo").innerText = gameState.personajeEnemigo;
    $("vs-img-enemigo").src = gameState.imagenes[gameState.personajeEnemigoId];
    $("tarjeta-jugador").style.background = `url(${
      gameState.cardBg[gameState.personajeSeleccionadoId]
    })`;
    $("tarjeta-jugador").style.backgroundPosition = "center";
    $("tarjeta-jugador").style.backgroundSize = "cover";
    $("tarjeta-enemigo").style.background = `url(${
      gameState.cardBg[gameState.personajeEnemigoId]
    })`;
    $("tarjeta-enemigo").style.backgroundPosition = "center";
    $("tarjeta-enemigo").style.backgroundSize = "cover";
    $("personajes-vs-enemigo").style.display = "flex";
    $("seleccionar-ataque").style.display = "block";

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
      gameState.corazonesEnemigo.pop();
    } else {
      crearDialogo(
        `${gameState.personajeEnemigo} le ha ganado a ${gameState.personajeSeleccionado}. Pierdes una vida en esta ronda!`
      );
      gameState.vidasJugador--;
      gameState.corazonesJugador.pop();
    }
    actualizarVidasUI();
    revisarVidas();
  }

  function actualizarVidasUI() {
    nombreJugador.textContent = gameState.corazonesJugador
      .map((vida) => vida)
      .toString()
      .replaceAll(",", " ");
    nombreEnemigo.textContent = gameState.corazonesEnemigo
      .map((vida) => vida)
      .toString()
      .replaceAll(",", " ");
  }

  function revisarVidas() {
    if (gameState.vidasJugador === 0) {
      crearDialogo(
        `${gameState.personajeEnemigo} ha ganado el combate. 😓`,
        "Perdiste"
      );
      $("tarjeta-enemigo").style.outline = "4px solid lightgreen";
      $("tarjeta-enemigo").style.filter = "drop-shadow(0 0 20px lightgreen)";
      $("tarjeta-enemigo").style.animation = "rebote 3s linear infinite";
      $("tarjeta-enemigo").style.transformStyle = "preserve-3d";
      $("ganador-enemigo").style.display = "flex";
      deshabilitarBotones();
    } else if (gameState.vidasEnemigo === 0) {
      crearDialogo(
        `¡${gameState.personajeSeleccionado} ha ganado el combate! 🏆`,
        "Game Over"
      );
      $("tarjeta-jugador").style.outline = "4px solid lightgreen";
      $("tarjeta-jugador").style.filter = "drop-shadow(0 0 20px lightgreen)";
      $("tarjeta-jugador").style.animation = "rebote 3s linear infinite";
      $("tarjeta-jugador").style.transformStyle = "preserve-3d";
      $("ganador-jugador").style.display = "flex";
      deshabilitarBotones();
    }
  }

  function deshabilitarBotones() {
    botonPunio.disabled = true;
    botonPatada.disabled = true;
    botonBarrida.disabled = true;
    botonPunio.style.cursor = "not-allowed";
    botonBarrida.style.cursor = "not-allowed";
    botonPatada.style.cursor = "not-allowed";
    botonPunio.style.opacity = 0.5;
    botonBarrida.style.opacity = 0.5;
    botonPatada.style.opacity = 0.5;
  }

  // Listeners
  botonPersonajeJugador.onclick = () => {
    seleccionarPersonajeJugador();
    const audio = new Audio("../public/assets/videoplayback.mp3");
    audio.volume = 0.5;
    audio.play();
  };
  botonPunio.onclick = () => ataqueJugador("Puño 👊");
  botonPatada.onclick = () => ataqueJugador("Patada 🦵");
  botonBarrida.onclick = () => ataqueJugador("Barrida 🦶");
  botonReiniciar.onclick = () => window.location.reload();
};
