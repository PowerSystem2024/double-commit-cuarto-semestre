// Método para crear un elemento dialog
const crearDialogo = (contenido = "", titulo = "Resultado", icono = "ℹ") => {
  const dialogo = document.createElement("dialog");
  const botonCerrar = dialogo.querySelector("#cerrar-dialogo");
  const divDialogo = dialogo.querySelector("div");
  const controller = new AbortController();
  dialogo.innerHTML = `
        <div>
            <header>
            <p>
            <span style="padding-inline: 8px; border: 1px solid #fff; border-radius: 50%; background: #2d48e4; color: #fff">${icono}</span>
            ${titulo}
            </p>
            <span id="cerrar-dialogo" title="Cerrar diálogo" style="cursor: pointer;">✖</span>
            </header>
            <p style="padding: 24px">${contenido}</p>
        </div>
    `;
  document.body.appendChild(dialogo);
  dialogo.style.animation = "slideIn 0.3s ease-in";
  document.body.style.overflowY = "hidden";
  dialogo.showModal();

  const cerrarDialogoConAnimacion = () => {
    dialogo.style.animation = "vanish 0.3s ease-out";
    dialogo.addEventListener(
      "animationend",
      () => {
        dialogo.close();
        dialogo.remove();
        controller.abort();
      },
      { once: true, signal: controller.signal }
    );
  };

  dialogo.onclick = (event) => {
    if (
      !divDialogo?.contains(event.target) ||
      botonCerrar?.contains(event.target)
    ) {
      cerrarDialogoConAnimacion();
    }
  };
};

export { crearDialogo };
