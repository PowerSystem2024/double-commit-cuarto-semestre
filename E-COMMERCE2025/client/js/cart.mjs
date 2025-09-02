import { carrito } from "./index.mjs";

const modalOverlay = document.getElementById("modal-overlay");
const modalContainer = document.getElementById("modal-container");
const cartBtn = document.getElementById("cart-btn");

export const displayCart = ({ buyContent }) => {
  modalContainer.innerHTML = "";
  // mostrar
  modalContainer.style.display = "flex";
  modalContainer.style.flexDirection = "column";
  modalOverlay.style.display = "block";

  //modal Header
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";

  const modalTitle = document.createElement("div");
  modalTitle.innerText = "Carrito de Compras";
  modalTitle.className = "modal-title";

  const modalItems = document.createElement("div");
  buyContent.map((item) => {
    modalItems.innerHTML = `<div class="modal-items">
        <img class="modal-img" src="${item.img}"/>
        <h3 class="modal-item-name">${item.nombre}</h3>
        <p class="modal-item-cant">Cantidad: ${item.cant}</p>
        <p class="modal-item-price">Precio: $${item.precio}</p>
        </div>
        `;
  });

  const modalClose = document.createElement("div");
  modalClose.classList.add("close");
  modalClose.innerText = "❌";
  modalClose.className = "modal-close";
  modalHeader.append(modalClose);

  modalClose.addEventListener("click", () => {
    modalContainer.style.display = "none";
    modalOverlay.style.display = "none";
  });

  modalOverlay.addEventListener("click", (e) => {
    if (modalContainer && !modalContainer.contains(e.target)) {
      modalContainer.style.display = "none";
      modalOverlay.style.display = "none";
    }
  });

  modalContainer.append(modalTitle, modalHeader, modalItems);
};
