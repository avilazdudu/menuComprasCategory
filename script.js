const products = [
    {
        name: "Ouro Branco",
        priceNormal: 45.90,
        priceText: "R$ 45.90",
        image: "./img/OuroBranco.png",
        quantity: 0,
        category: "chocolate"
    },
    {
        name: "Sonho de Valsa",
        priceNormal: 39.99,
        priceText: "R$ 39.99",
        image: "./img/SonhoDeValsa.png",
        quantity: 0,
        category: "chocolate"
    },
    {
        name: "Ferrero Rocher",
        priceNormal: 54.90,
        priceText: "R$ 54.90",
        image: "./img/FerreroRocher.png",
        quantity: 0,
        category: "chocolate"
    },
    {
        name: "Galak Nestle",
        priceNormal: 44.90,
        priceText: "R$ 44.90",
        image: "./img/Nestle.png",
        quantity: 0,
        category: "chocolate"
    },
    {
        name: "Bis Lacta",
        priceNormal: 60.99,
        priceText: "R$ 60.99",
        image: "./img/Lacta.png",
        quantity: 0,
        category: "chocolate"
    },
    {
        name: "Confeitos Dublin",
        priceNormal: 65.90,
        priceText: "R$ 65.90",
        image: "./img/Confetes.png",
        quantity: 0,
        category: "chocolate"
    },
    {
        name: "Smartphone",
        priceNormal: 299.99,
        priceText: "R$ 299.99",
        image: "./img/Celular.png",
        quantity: 0,
        category: "electronics",
    },
    {
        name: "Earphones",
        priceNormal: 99.99,
        priceText: "R$ 99.99",
        image: "./img/Bluetooth.png",
        quantity: 0,
        category: "electronics",
    },
    {
        name: "Headset",
        priceNormal: 199.99,
        priceText: "R$ 199.99",
        image: "./img/Headset.png",
        quantity: 0,
        category: "electronics",
    },
    {
        name: "Laptop",
        priceNormal: 499.99,
        priceText: "R$ 499.99",
        image: "./img/Laptop.png",
        quantity: 0,
        category: "electronics",
    },
    {
        name: "Smartwatch",
        priceNormal: 149.99,
        priceText: "R$ 149.99",
        image: "./img/Smartwatch.png",
        quantity: 0,
        category: "electronics",
    },
    {
        name: "PS5",
        priceNormal: 999.99,
        priceText: "R$ 999.99",
        image: "./img/PS5.png",
        quantity: 0,
        category: "electronics",
    }
]

products.forEach((product, index) => {
    const productContainer = document.createElement("div");
    productContainer.className = "col-3 mb-5 ml-5 mr-5 text-center shadow product-box all";
    productContainer.classList.add(product.category);
    productContainer.style.height = "30rem";
    productContainer.innerHTML = `
        <div class="row">
            <img src="${product.image}" alt="${product.name}" class="h-100 w-75 bg-light col-12 product-box-img imgProduct">
            <span class="h6 col-12 d-flex justify-content-start m-3 nameProduct">${product.name}</span>
            <div class="col-12 d-flex justify-content-center">
                <div class="border border-danger p-2" id="counter">
                    <button class="text-dark btn btn-outline-danger mais">+</button>
                    <span class="text-dark valor">${product.quantity}</span>
                    <button class="text-dark btn btn-outline-danger menos">-</button>
                </div>
            </div>
            <span class="col-6 d-flex m-3 priceProduct"><strong>${product.priceText}</strong></span>
            <button class="col-3 ml-4 mr-3 mt-2 mb-3 d-flex justify-content-center btn btn-success btnCompra">Buy</button>
         </div>
    `;
    const body = document.getElementById("body");
    body.appendChild(productContainer);

    const maisButton = productContainer.querySelector(".mais");
    const menosButton = productContainer.querySelector(".menos");
    const valueSpan = productContainer.querySelector(".valor");
    const btnCompra = productContainer.querySelector(".btnCompra");

    maisButton.addEventListener("click", () => {
        product.quantity += 1;
        valueSpan.innerText = product.quantity;
    });

    menosButton.addEventListener("click", () => {
        if (product.quantity > 0) {
            product.quantity -= 1;
            valueSpan.innerText = product.quantity;
        }
    });

    btnCompra.addEventListener("click", () => {
        if (product.quantity === 0) {
            alert("Please select a quantity before adding to the cart.");
            return;
        }

        const divItems = document.getElementById("divItems");
        const existingItem = divItems.querySelector(`.product-cart[data-index="${index}"]`);

        if (existingItem) {
            const quantitySpan = existingItem.querySelector(".product-cart-quantity");
            const priceSpan = existingItem.querySelector(".product-cart-price");
            product.priceUpdate = (product.quantity * product.priceNormal).toFixed(2);
            quantitySpan.innerText = `x ${product.quantity}`;
            priceSpan.innerText = `= R$${product.priceUpdate}`;
        } else {
            const cartItem = document.createElement("div");
            cartItem.className = "product-cart d-flex justify-content-space align-items-center shadow-sm p-3";
            cartItem.setAttribute("data-index", index);
            product.priceUpdate = (product.quantity * product.priceNormal).toFixed(2);
            cartItem.innerHTML = `
                <div class="removeButton"><i class="fa-solid fa-close"></i></div>
                <img src="${product.image}" alt="${product.name}" class="product-cart-img">
                <span class="product-cart-name">${product.name}</span>
                <span class="product-cart-quantity">x ${product.quantity}</span>
                <span class="product-cart-price">= R$${product.priceUpdate}</span>
            `;
            divItems.appendChild(cartItem);

            const removeButton = cartItem.querySelector(".removeButton");
            removeButton.addEventListener("click", () => {
                cartItem.remove(); 
                product.quantity = 0; 
                updateCartTotal(); 
            });
        }

        updateCartTotal();
        openCart(); 
    });
});


function updateCartTotal() {
    const valorTotalElement = document.getElementById("valueCart");
    const total = products.reduce((valor, product) => {
        return valor + (product.quantity * product.priceNormal);
    }, 0);
    valorTotalElement.innerText = `R$${total.toFixed(2)}`;
}

const cart = document.getElementById("cart")
const btnOpen = document.getElementById("open")
const btnClose = document.getElementById("close") 


function openCart(){ 
    cart.style.visibility = "visible";
    cart.style.animation = "slideIn 1s forwards"
    btnOpen.style.animation = "slideInBtn 1s forwards"
}
function closeCart(){ 
    cart.style.animation = "slideOut 1s forwards";
    btnOpen.style.animation = "slideOutBtn 1s forwards"
    setTimeout(() => {
        cart.style.visibility = "hidden";
    }, 1000);
}

btnOpen.addEventListener("click", openCart);
btnClose.addEventListener("click", closeCart);

const btnChocolate = document.getElementById("btnChocolate");
const btnElectronic = document.getElementById("btnElectronic");
const btnAll = document.getElementById("backAll");

btnChocolate.addEventListener("click", () => {
    const products = document.querySelectorAll(".product-box");
    products.forEach((product) => {
        if (product.classList.contains("chocolate")) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
});

btnAll.addEventListener("click", () => {
    const products = document.querySelectorAll(".product-box");
    products.forEach((product) => {
        product.style.display = "block";
    });
});

btnElectronic.addEventListener("click", () => {
    const products = document.querySelectorAll(".product-box");
    products.forEach((product) => {
        if (product.classList.contains("electronics")) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
});
