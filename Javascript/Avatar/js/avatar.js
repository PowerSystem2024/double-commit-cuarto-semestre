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
  reproducirAleatorio,
} from "../utils/funcionesAleatorias.mjs";
import { Personaje } from "./Personaje.mjs";

window.onload = () => {
  // Variables para las instancias de personajes
  let jugadorInstancia = null;
  let enemigoInstancia = null;

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

    // Empezar a reproducir automáticamente
    reproducirAleatorio(audio, pistas);

    botonReiniciar.style.display = "flex";
    h2Eleccion.style.display = "none";
    tituloHeader.style.transition = "0.6s ease-in-out";
    tituloHeader.style.scale = "0.8";
    botonPersonajeJugador.style.display = "none";
    gameState.personajeSeleccionado = seleccion.nombre;
    gameState.personajeSeleccionadoId = seleccion.id;

    // Crear instancia del jugador
    jugadorInstancia = new Personaje(
      seleccion.nombre,
      gameState.imagenes[seleccion.id],
      gameState.vidasJugador,
      [...gameState.corazonesJugador],
      null
    );

    // Selección de enemigo
    let enemigo;
    do {
      enemigo =
        gameState.personajes[aletarorio(0, gameState.personajes.length - 1)];
    } while (enemigo.id === seleccion.id);

    gameState.personajeEnemigo = enemigo.nombre;
    gameState.personajeEnemigoId = enemigo.id;

    // Crear instancia del enemigo
    enemigoInstancia = new Personaje(
      enemigo.nombre,
      gameState.imagenes[enemigo.id],
      gameState.vidasEnemigo,
      [...gameState.corazonesEnemigo],
      null
    );

    // Ocultar y mostrar secciones
    seccionSeleccionarPersonaje.style.display = "none";
    $("vs-nombre-jugador").innerText = jugadorInstancia.nombre;
    $("vs-img-jugador").src = jugadorInstancia.imagen;
    $("vs-nombre-enemigo").innerText = enemigoInstancia.nombre;
    $("vs-img-enemigo").src = enemigoInstancia.imagen;
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
    if (!jugadorInstancia || !enemigoInstancia) return;
    
    gameState.ataqueJugador = tipo;
    procesarCombate(tipo);
  }

  // Lógica de combate usando las instancias
  function procesarCombate(tipoAtaque) {
    if (!jugadorInstancia.estaVivo() || !enemigoInstancia.estaVivo()) return;

    // Procesar el combate usando el método estático de la clase
    const resultado = jugadorInstancia.atacar(enemigoInstancia, tipoAtaque);
    
    if (!resultado) return;

    // Actualizar gameState para mantener compatibilidad
    gameState.ataqueJugador = resultado.ataqueJugador;
    gameState.ataqueEnemigo = resultado.ataqueEnemigo;
    gameState.vidasJugador = jugadorInstancia.vidas;
    gameState.vidasEnemigo = enemigoInstancia.vidas;
    gameState.corazonesJugador = [...jugadorInstancia.corazones];
    gameState.corazonesEnemigo = [...enemigoInstancia.corazones];

    // Mostrar resultado del combate
    mostrarResultadoCombate(resultado);
    
    actualizarVidasUI();
    revisarVidas(resultado);
  }

  function mostrarResultadoCombate(resultado) {
    if (resultado.resultado === 'empate') {
      crearDialogo(
        `<div style="display: flex; align-items: center; gap: 8px; margin: 0 auto; justify-content: center;">
          <img src="${jugadorInstancia.imagen}" width="45px" height="45px" style="border-radius: 50%" />
          <strong>${jugadorInstancia.nombre}</strong> empató esta ronda con  
          <img src="${enemigoInstancia.imagen}" width="45px" height="45px" style="border-radius: 50%" />
          <strong>${enemigoInstancia.nombre}</strong>
        </div>`
      );
    } else if (resultado.resultado === 'jugador') {
      crearDialogo(
        `<div style="display: flex; align-items: center; gap: 8px; margin: 0 auto; justify-content: center;">
          <img src="${jugadorInstancia.imagen}" width="45px" height="45px" style="border-radius: 50%" />
          <strong>${jugadorInstancia.nombre}</strong> gana la ronda con ${resultado.ataqueJugador} a 
          <img src="${enemigoInstancia.imagen}" width="45px" height="45px" style="border-radius: 50%" />
          <strong>${enemigoInstancia.nombre}</strong> que eligió ${resultado.ataqueEnemigo}!
        </div>`
      );
    } else {
      crearDialogo(
        `<div style="display: flex; align-items: center; gap: 8px; margin: 0 auto; justify-content: center;">
          <img src="${enemigoInstancia.imagen}" width="45px" height="45px" style="border-radius: 50%" />
          <strong>${enemigoInstancia.nombre}</strong> eligió ${resultado.ataqueEnemigo} y le ha ganado a 
          <img src="${jugadorInstancia.imagen}" width="45px" height="45px" style="border-radius: 50%" />
          <strong>${jugadorInstancia.nombre}</strong> que eligió ${resultado.ataqueJugador}!
        </div>`
      );
    }
  }

  function actualizarVidasUI() {
    nombreJugador.textContent = jugadorInstancia.corazones
      .join(' ');
    nombreEnemigo.textContent = enemigoInstancia.corazones
      .join(' ');
  }

  function revisarVidas(resultado) {
    if (resultado.ganadorFinal === 'enemigo') {
      crearDialogo(
        `<div style="display: flex; align-items: center; gap: 8px; margin: 0 auto; justify-content: center;">
          <img src="${enemigoInstancia.imagen}" width="45px" height="45px" style="border-radius: 50%" />
          <strong>${enemigoInstancia.nombre} ha ganado el combate. 😓</strong>
        </div>`,
        "Perdiste"
      );
      $("tarjeta-enemigo").style.outline = "4px solid lightgreen";
      $("tarjeta-enemigo").style.filter = "drop-shadow(0 0 20px lightgreen)";
      $("tarjeta-enemigo").style.animation = "rebote 3s linear infinite";
      $("tarjeta-enemigo").style.transformStyle = "preserve-3d";
      $("ganador-enemigo").style.display = "flex";
      deshabilitarBotones();
    } else if (resultado.ganadorFinal === 'jugador') {
      crearDialogo(
        `<div style="display: flex; align-items: center; gap: 8px; margin: 0 auto; justify-content: center;">
          <img src="${jugadorInstancia.imagen}" width="45px" height="45px" style="border-radius: 50%" />
          <strong>¡${jugadorInstancia.nombre} ha ganado el combate! 🏆</strong>
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

    // Evento de introducción
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