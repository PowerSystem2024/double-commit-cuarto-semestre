export const aletarorio = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export function ataqueAleatorioEnemigo() {
  const ataques = ["Puño 👊", "Patada 🦵", "Barrida 🦶"];
  return ataques[aletarorio(0, ataques.length - 1)];
}

export function reproducirAleatorio(audio = new Audio(), pistas = []) {
  const randomIndex = Math.floor(Math.random() * pistas.length);

  // si ya había un audio sonando, lo pausamos
  if (audio) {
    audio.pause();
    audio = null;
  }

  audio = new Audio(pistas[randomIndex]);
  audio.volume = 0.5;
  audio.play();
  // Cuando termina el audio comienza otro aleatorio
  audio.addEventListener("ended", reproducirAleatorio);
}
