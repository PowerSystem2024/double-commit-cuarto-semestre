    const modalOverlay = document.getElementById("modal-overlay");
    const modalContainer = document.getElementById("modal-container");
    const cartBtn = document.getElementById("cart-btn");

    const displayCart = () => {

        modalContainer.innerHTML = "";
        // mostrar 
        modalContainer.style.display = "flex";
        modalOverlay.style.display = "block";

        //modal Header
        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';

        const modalTitle = document.createElement('div');
        modalTitle.innerText = 'Carrito de Compras';
        modalTitle.className = 'modal-title';

        const modalClose = document.createElement('div');
        modalClose.innerText = '❌';
        modalClose.className = 'modal-close';
        modalHeader.append(modalClose);


        modalClose.addEventListener("click", () => {
            modalContainer.style.display = "none";
            modalOverlay.style.display = "none";
        });

        modalContainer.append(modalTitle, modalHeader);

    };

    cartBtn.addEventListener("click", () => {
        console.log("Carrito clickeado");
        displayCart();
    });
