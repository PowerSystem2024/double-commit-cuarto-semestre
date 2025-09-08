import {
  $,
  audio,
  pistas,
  gameState,
  h2Eleccion,
  tituloHeader,
  botonReglas,
  botonPunio,
  botonPatada,
  botonBarrida,
  nombreEnemigo,
  nombreJugador,
  reglasDelJuego,
  botonReiniciar,
  botonPersonajeJugador,
  seccionSeleccionarPersonaje,
} from "../utils/constants.mjs";
import { crearDialogo } from "../utils/dialog.mjs";
import {
  aletarorio,
  ataqueAleatorioEnemigo,
  reproducirAleatorio,
} from "../utils/funcionesAleatorias.mjs";

window.onload = () => {
  // Inicialización
  botonReglas.onclick = () =>
    crearDialogo(reglasDelJuego.textContent, "Información del Juego");

  // Selección de personaje
  function seleccionarPersonajeJugador() {
    const seleccion = gameState.personajes.find(
      (personaje) => $(personaje.id).checked
    );

    if (!seleccion) {
      crearDialogo("Por favor selecciona un personaje.", "Información");
      return;
    }

    // empezar a reproducir automáticamente
    reproducirAleatorio(audio, pistas);

    botonReiniciar.style.display = "flex";
    h2Eleccion.style.display = "none";
    tituloHeader.style.transition = "0.6s ease-in-out";
    tituloHeader.style.scale = "0.8";
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

  // Lógica de combate
  function procesarCombate() {
    if (gameState.vidasEnemigo <= 0 || gameState.vidasJugador <= 0) return;

    if (gameState.ataqueEnemigo === gameState.ataqueJugador) {
      crearDialogo(
        `<div style="display: flex; align-items: center; gap: 8px; margin: 0 auto; justify-content: center;">
          <img src="${
            gameState.imagenes[gameState.personajeSeleccionadoId]
          }" width="45px" height="45px" style="border-radius: 50%" /><strong>${
          gameState.personajeSeleccionado
        }</strong> empató esta ronda con  <img src="${
          gameState.imagenes[gameState.personajeEnemigoId]
        }" width="45px" height="45px" style="border-radius: 50%" /><strong>${
          gameState.personajeEnemigo
        }</strong>`
      );
    } else if (
      (gameState.ataqueJugador === "Puño 👊" &&
        gameState.ataqueEnemigo === "Barrida 🦶") ||
      (gameState.ataqueJugador === "Barrida 🦶" &&
        gameState.ataqueEnemigo === "Patada 🦵") ||
      (gameState.ataqueJugador === "Patada 🦵" &&
        gameState.ataqueEnemigo === "Puño 👊")
    ) {
      crearDialogo(
        `<div style="display: flex; align-items: center; gap: 8px; margin: 0 auto; justify-content: center;">
          <img src="${
            gameState.imagenes[gameState.personajeSeleccionadoId]
          }" width="45px" height="45px" style="border-radius: 50%" /><strong>${
          gameState.personajeSeleccionado
        }</strong> gana la ronda con ${gameState.ataqueJugador} a 
        <img src="${
          gameState.imagenes[gameState.personajeEnemigoId]
        }" width="45px" height="45px" style="border-radius: 50%" /><strong>${
          gameState.personajeEnemigo
        }</strong> que eligió ${gameState.ataqueEnemigo}!
        </div>`
      );
      gameState.vidasEnemigo--;
      gameState.corazonesEnemigo.pop();
    } else {
      crearDialogo(
        `<div  style="display: flex; align-items: center; gap: 8px; margin: 0 auto; justify-content: center;">
          <img src="${
            gameState.imagenes[gameState.personajeEnemigoId]
          }" width="45px" height="45px" style="border-radius: 50%" /><strong>${
          gameState.personajeEnemigo
        }</strong> eligió ${
          gameState.ataqueEnemigo
        } y le ha ganado a <img src="${
          gameState.imagenes[gameState.personajeSeleccionadoId]
        }" width="45px" height="45px" style="border-radius: 50%" /><strong>${
          gameState.personajeSeleccionado
        }</strong> que eligió ${gameState.ataqueJugador}!
        </div>`
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
        `<div style="display: flex; align-items: center; gap: 8px; margin: 0 auto; justify-content: center;">
          <img src="${
            gameState.imagenes[gameState.personajeEnemigoId]
          }" width="45px" height="45px" style="border-radius: 50%" /><strong>${
          gameState.personajeEnemigo
        } ha ganado el combate. 😓</strong>
        </div>`,
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
        `<div style="display: flex; align-items: center; gap: 8px; margin: 0 auto; justify-content: center;">
          <img src="${
            gameState.imagenes[gameState.personajeSeleccionadoId]
          }" width="45px" height="45px" style="border-radius: 50%" /><strong>¡${
          gameState.personajeSeleccionado
        } ha ganado el combate! 🏆</strong>
        </div>`,
        "Juego Finalizado"
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
  };
  botonPunio.onclick = () => ataqueJugador("Puño 👊");
  botonPatada.onclick = () => ataqueJugador("Patada 🦵");
  botonBarrida.onclick = () => ataqueJugador("Barrida 🦶");
  botonReiniciar.onclick = () => window.location.reload();

  // Inicializar worker de tiempo en otro hilo separado del hilo principal del navegador (sin bloqueos de la UI)
  const worker = new Worker("web-worker/timerWorker.js");

  // Inicializar contador en el worker
  worker.postMessage(1000);
  // Recibir el contador del web worker
  worker.onmessage = (event) => {
    const timer = event.data;

    // Evento de itroducción
    if (timer === 2) {
      $("shadder").style.display = "flex";
      $("intro").style.display = "none";
      $("intro-reglas").style.display = "flex";
      botonPersonajeJugador.style.animation = "none";
      botonPersonajeJugador.style.zIndex = 0;
      botonReglas.style.zIndex = 99;
      botonReglas.style.animation = "introButton 3s linear infinite";
      botonReglas.style.filter = "drop-shadow(0 0 10px #28517b)";
    } else if (timer === 4) {
      $("intro").style.display = "flex";
      botonPersonajeJugador.style.zIndex = 99;
      botonPersonajeJugador.style.animation = "introButton 3s linear infinite";
      botonPersonajeJugador.style.filter = "drop-shadow(0 0 10px #28517b)";
      worker.terminate();
    }
  };

  // Quitar driver de introducción
  botonPersonajeJugador.onmouseover = () => {
    $("shadder").style.display = "none";
    $("intro").style.display = "none";
    $("intro-reglas").style.display = "none";
    botonPersonajeJugador.style.animation = "none";
    worker.terminate();
  };

  botonReglas.onmouseover = () => {
    $("shadder").style.display = "none";
    $("intro-reglas").style.display = "none";
    $("intro").style.display = "none";
    botonReglas.style.animation = "none";
    worker.terminate();
  };
};
