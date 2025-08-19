const shopContent = document.getElementById("shopContent"); 

productos.forEach((product) => {
    const content = document.createElement("div");
    content.innerHTML = `
        <img src="${product.imagen}">
        <h3>${product.nombre}</h3>
        <p>${product.precio}</p>
        `;
        shopContent.append(content);
    });