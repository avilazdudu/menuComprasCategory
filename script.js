const products = [
    {
        name: "Branco's Easter Egg",
        priceNormal: 45.90,
        priceText: "R$ 45.90",
        image: "./img/OuroBranco.png",
        quantity: 0
    },
    {
        name: "Sonho's Easter Egg",
        priceNormal: 39.99,
        priceText: "R$ 39.99",
        image: "./img/SonhoDeValsa.png",
        quantity: 0
    },
    {
        name: "Rocher's Easter Egg",
        priceNormal: 54.90,
        priceText: "R$ 54.90",
        image: "./img/FerreroRocher.png",
        quantity: 0
    },
    {
        name: "Nestle's Easter Egg",
        priceNormal: 44.90,
        priceText: "R$ 44.90",
        image: "./img/Nestle.png",
        quantity: 0
    },
    {
        name: "Lacta's Easter Egg",
        priceNormal: 60.99,
        priceText: "R$ 60.99",
        image: "./img/Lacta.png",
        quantity: 0
    },
    {
        name: "Dublin' Easter Egg",
        priceNormal: 65.90,
        priceText: "R$ 65.90",
        image: "./img/Confetes.png",
        quantity: 0
    }
]

products.forEach((product, index) => {
    const productContainer = document.createElement("div");
    productContainer.className = "col-3 m-5 text-center shadow product-box";
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
        const existingCartItem = divItems.querySelector(`.product-cart[data-index="${index}"]`);

        if (existingCartItem) {
            const quantitySpan = existingCartItem.querySelector(".product-cart-quantity");
            const priceSpan = existingCartItem.querySelector(".product-cart-price");
            product.priceUpdate = (product.quantity * product.priceNormal).toFixed(2);
            quantitySpan.innerText = `x ${product.quantity}`;
            priceSpan.innerText = `= R$${product.priceUpdate}`;
        } else {
            const cartItem = document.createElement("div");
            cartItem.className = "product-cart d-flex justify-content-center align-items-center shadow-sm p-3";
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
    const total = products.reduce((sum, product) => {
        return sum + (product.quantity * product.priceNormal);
    }, 0);
    valorTotalElement.innerText = `R$${total.toFixed(2)}`;
}

let cart = document.getElementById("cart")
let btnOpen = document.getElementById("open")
let btnClose = document.getElementById("close") 


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

btnOpen.addEventListener("click", openCart) 
btnClose.addEventListener("click", closeCart) 