// Método para crear un elemento dialog
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
    if (
      !divDialogo.contains(event.target) ||
      botonCerrar.contains(event.target)
    ) {
      dialogo.close();
      dialogo.remove();
    }
  };
};

export { crearDialogo, cerrarDialogo };
