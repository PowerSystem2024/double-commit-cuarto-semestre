import { displayCart } from "./cart.mjs";
import { productos } from "./products.mjs";

const shopContent = document.getElementById("shopContent");
const carrito = [];

productos.forEach((product) => {
  const content = document.createElement("div");
  content.innerHTML = `
        <img src="${product.imagen}">
        <h3>${product.nombre}</h3>
        <p>${product.precio}</p>
        `;
  shopContent.append(content);

  const buyButton = document.createElement("button");
  buyButton.innerText = "Comprar";

  content.append(buyButton);

  buyButton.addEventListener("click", () => {
    carrito.push({
      id: product.id,
      img: product.imagen,
      cant: product.quanty,
      nombre: product.nombre,
      precio: product.precio,
    });
    displayCart({ buyContent: carrito });
    console.log(carrito);
  });
});

export { carrito };
