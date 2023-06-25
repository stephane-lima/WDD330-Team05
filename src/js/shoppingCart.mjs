import { getLocalStorage, renderListWithTemplate, setLocalStorage } from "./utils.mjs";

export function ShoppingCart() {
    const cartItems = getLocalStorage("so-cart");

    if (cartItems && cartItems.length > 0) {
        console.log(cartItems);
        const outputEl = document.querySelector(".product-list");
        renderListWithTemplate(cartItemTemplate, outputEl, cartItems);

        var cartTotalContainer = document.querySelector(".cart-footer");
        cartTotalContainer.classList.remove("hide");

        var cartTotalPrice = cartItems.reduce(function (accumulator, currentItem) {
            return accumulator + currentItem.FinalPrice;
        }, 0);

        var cartTotal = document.querySelector(".cart-total");
        cartTotal.textContent = "Total: $" + cartTotalPrice.toFixed(2);

        // const total = calculateListTotal(cartItems);
        // displayCartTotal(total); 
    } else {
        document.querySelector(".product-list").innerHTML = "<p>Your cart is empty</p>";
        cartTotalContainer = document.querySelector(".cart-footer");
        cartTotalContainer.classList.add("hide");
    }
}

// function displayCartTotal(total) {
//     if (total > 0) {
//         document.querySelector(".list-footer").classList.remove("hide");
//         document.querySelector(".list-total").innerText += ` $${total}`;
//     } else {
//         document.querySelector("list-footer").classList.add("hide");
//     }
// }

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
        <img
            src="${item.Images.PrimaryMedium}"
            alt="${item.Name}"
        />
    </a>
    <a href="/product_pages/index.html?product=${item.Id}"
        <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <div class="box"><p class="cart-card__quatity">qty: 1</p><span data-id="${item.Id}">X</span></div>
    <p class="cart-card__price">$${item.FinalPrice}</p></li>`;

    return newItem;
}

// function calculateListTotal(list) {
//     const amounts = list.map((item) => item.FinalPrice);
//     const total = amounts.reduce((sum, item) => sum + item, 0);
//     return total;
// }

export function removeItem(itemId) {
    let cartItems = getLocalStorage("so-cart");
    cartItems = cartItems.filter(function (item) {
        console.log(item.id);
        return item.Id !== itemId;
    });
    setLocalStorage("so-cart", cartItems);
    console.log(cartItems);
    // location.reload();
}