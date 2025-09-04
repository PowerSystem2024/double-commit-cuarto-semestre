import { displayCart, displayCartCounter } from "./cart.mjs";
import { productos } from "./products.mjs";

const shopContent = document.getElementById("shopContent");
const carrito = [];

productos.forEach((product) => {
  const content = document.createElement("div");
  content.className = "product-container";
  content.innerHTML = `
        <img src="${product.imagen}">
        <h3>${product.nombre}</h3>
        <p class="price" style="display: flex; justify-content: center;">$ ${product.precio}</p>
        `;
  shopContent.append(content);

  const buyButton = document.createElement("button");
  buyButton.innerText = "Comprar";

  content.append(buyButton);

  buyButton.addEventListener("click", () => {
    const repeat = carrito.some(
      (repeatProduct) => repeatProduct.id === product.id
    );

    if (repeat) {
      carrito.map((prod) => {
        if (prod.id === product.id) {
          prod.cant++;
          displayCartCounter();
        }
      });
    } else {
      carrito.push({
        id: product.id,
        img: product.imagen,
        cant: 1, // inicializa en 1
        nombre: product.nombre,
        precio: product.precio,
      });
      document.body.style.overflow = "hidden";
      displayCart({ buyContent: carrito });
    }
  });
});

export { carrito };
