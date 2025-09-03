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
        <div class="delete-product">❌</div>
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
        <div class="price">${(product.precio * product.cant).toFixed(2)} $</div>
        <div class="delete-product">❌</div>
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
    <div class="total-price">Total: ${total.toFixed(2)} $</div>
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

          const preference = await response.json();
          alert(JSON.stringify(response));
          createCheckoutButton(preference.id);
        } catch (error) {
          alert("error :(");
        }
      });

    const createCheckoutButton = (preferenceId) => {
      const bricksBuilder = mp.bricks();

      const renderComponent = async () => {
        if (window.checkoutButton) window.checkoutButton.unmount();

        await bricksBuilder.create("wallet", "wallet_container", {
          initialization: {
            preferenceId: preferenceId,
            redirectMode: "modal",
          },
        });
      };

      renderComponent();
    };
  } else {
    const modalText = document.createElement("h2");
    modalText.className = "modal-body";
    modalText.innerText = "Tu carrito está vacío";
    modalContainer.append(modalHeader, modalText);
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
