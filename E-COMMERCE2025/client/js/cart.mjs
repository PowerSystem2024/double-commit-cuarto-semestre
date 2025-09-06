import { carrito } from "./index.mjs";

const modalOverlay = document.getElementById("modal-overlay");
const modalContainer = document.getElementById("modal-container");
const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");

export const displayCart = ({ buyContent = [] }) => {
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
  buyContent.forEach((item) => {
    modalItems.innerHTML += `<div class="modal-items">
        <img class="modal-img" src="${item.img}"/>
        <h3 class="modal-item-name">${item.nombre}</h3>
        <p class="modal-item-cant">Cantidad: ${item.cant}</p>
        <p class="modal-item-price">Precio: $${item.precio}</p>
        <div class="delete-product">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </div>
        </div>
        `;
  });

  const modalClose = document.createElement("div");
  modalClose.classList.add("close");
  modalClose.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
  modalClose.className = "modal-close";
  modalHeader.append(modalClose);

  const closeModalWithEffect = () => {
    modalContainer.style.animation = "slideOut 0.3s ease-out";
    const controller = new AbortController();

    modalContainer.addEventListener(
      "animationend",
      () => {
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
        document.body.style.overflow = "auto";
        controller.abort();
      },
      { signal: controller.signal }
    );
  };

  modalClose.addEventListener("click", () => {
    closeModalWithEffect();
  });

  modalOverlay.addEventListener("click", (e) => {
    if (modalContainer && !modalContainer.contains(e.target)) {
      closeModalWithEffect();
    }
  });

  modalHeader.append(modalTitle);
  modalContainer.append(modalHeader);

  /*modal body*/
  if (carrito.length > 0) {
    carrito.forEach((product) => {
      const modalBody = document.createElement("div");
      modalBody.className = "modal-body";
      modalBody.innerHTML = `
    <div class="product">
        <img class="product-img" src="${product.img}" />
        <div class="product-info">
            <h4>${product.nombre}</h4>
        </div>
      <div class="quantity">
        <span class="quantity-btn-decrese">-</span>
        <span class="quantity-input">${product.cant}</span>
        <span class="quantity-btn-increse">+</span>
      </div>
        <div class="price">$${(product.precio * product.cant).toFixed(2)}</div>
        <div class="delete-product" title="Eliminar ítem">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </div>
    </div>
    `;
      modalContainer.append(modalBody);

      /*increse and decrese product functionality*/
      const decrese = modalBody.querySelector(".quantity-btn-decrese");
      decrese.addEventListener("click", () => {
        if (product.cant !== 1) {
          product.cant--;
        }
        displayCart({ buyContent: carrito });
        displayCartCounter();
      });

      const increse = modalBody.querySelector(".quantity-btn-increse");
      increse.addEventListener("click", () => {
        product.cant++;
        displayCart({ buyContent: carrito });
        displayCartCounter();
      });

      /*delete product*/
      const deleteProduct = modalBody.querySelector(".delete-product");

      deleteProduct.addEventListener("click", () => {
        deleteCartProduct(product.id);
        displayCart({ buyContent: carrito });
        displayCartCounter();
      });
    });

    /*modal fotter*/
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cant, 0);

    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalFooter.innerHTML = `
    <div class="total-price">Total: $${total.toFixed(2)}</div>
    <button class="btn-primary" id="checkout-btn"> go to checkout</button>  
    <div id="wallet_container"></div>
    `;
    modalContainer.append(modalFooter);

    // Public key de mercadopago
    const mp = new MercadoPago("APP_USR-a1c5fb3a-2163-4b01-a74b-d2fb029f0dbc", {
      locale: "es-AR",
    });

    //funcion que genera un titlo con al info del carrito
    const generateCartDescription = () => {
      return carrito
        .map((product) => `${product.nombre} (x${product.cant})`)
        .join(", ");
    };

    document
      .getElementById("checkout-btn")
      .addEventListener("click", async () => {
        try {
          const orderData = {
            title: generateCartDescription(),
            quantity: 1,
            price: total,
          };

          const response = await fetch(
            "http://localhost:3000/create_preference",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(orderData),
            }
          );
          if (!response.ok)
            throw new Error("Error en las respuesta al crear la preferencia.");
          const preference = await response.json();
          createCheckoutButton(preference.id);
        } catch (error) {
          alert("error :(");
        }
      });

    const createCheckoutButton = (preferenceId) => {
      const bricksBuilder = mp.bricks();

      const renderComponent = async () => {
        if (window.checkoutButton) window.checkoutButton.unmount();

        bricksBuilder.create("wallet", "button-checkout", {
          initialization: {
            preferenceId: preferenceId,
            redirectMode: "blank",
          },
          callbacks: {
            onError: (error) => console.error("Error al crear bricks:", error),
            onReady: () => {
              console.log("Integración lista");
            },
          },
        });
      };

      renderComponent();
    };
  } else {
    const modalText = document.createElement("h2");
    const modalParagraph = document.createElement("p");
    modalText.className = "modal-body";
    modalText.innerText = "Tu carrito está vacío 🛒";
    modalParagraph.style.textAlign = "center";
    modalParagraph.style.color = "#777";
    modalParagraph.innerText = "Agrega ítems para poder realizar la compra";
    modalContainer.append(modalHeader, modalText, modalParagraph);
  }
};

cartBtn.addEventListener("click", displayCart);

const deleteCartProduct = (id) => {
  const foundId = carrito.findIndex((element) => element.id === id);
  carrito.splice(foundId, 1);
  displayCart({ buyContent: carrito });
  displayCartCounter();
};

export const displayCartCounter = () => {
  const cartLength = carrito.reduce((acc, el) => acc + el.cant, 0);

  if (cartLength > 0) {
    cartCounter.style.display = "block";
    cartCounter.innerText = cartLength;
  } else {
    cartCounter.style.display = "none";
  }
};
