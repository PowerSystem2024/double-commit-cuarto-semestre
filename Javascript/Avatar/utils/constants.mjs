/**
 * Constantes y Variables
 */
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
    zuko: "public/zuko.webp",
    katara: "public/katara.jpg",
    aang: "public/aang.jpg",
    toph: "public/toph.webp",
  },
  cardBg: {
    zuko: "public/zuko-bg-card.jpg",
    katara: "public/katara-bg-card.jpg",
    aang: "public/aang-bg-card.jpg",
    toph: "public/toph-bg-card.jpg",
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
const seccionSeleccionarPersonaje = $("seccion-1");
const reglasDelJuego = $("reglas");
const botonReglas = $("ver-reglas");
const h2Eleccion = $("h2-eleccion");
const tituloHeader = $("titulo-header");
let audio = null;
const pistas = [
  "public/assets/videoplayback.mp3",
  "public/assets/book3-soundtrack.mp3",
  "public/assets/on_theMount_soundtrack.mp3",
];

export {
  $,
  gameState,
  botonPersonajeJugador,
  nombreJugador,
  nombreEnemigo,
  botonPunio,
  botonPatada,
  botonBarrida,
  botonReiniciar,
  seccionSeleccionarPersonaje,
  reglasDelJuego,
  botonReglas,
  h2Eleccion,
  tituloHeader,
  audio,
  pistas,
};
