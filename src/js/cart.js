import { loadHeaderFooter } from "./utils.mjs";
import { ShoppingCart, removeItem } from "./shoppingCart.mjs";



loadHeaderFooter();

ShoppingCart();

// const cartLength = getLocalStorage("so-cart");

// console.log(cartLength.length);

// var cartItems = document.querySelectorAll(".cart-card span[data-id]");

var cartItems = document.querySelectorAll(".cart-card span[data-id]");
cartItems.forEach(function (span) {
    span.addEventListener("click", function () {
        var itemId = this.getAttribute("data-id");
        removeItem(itemId);
        // location.reload();
        loadHeaderFooter();
        ShoppingCart();
    });
});


// var cartItems = document.querySelectorAll(".cart-card span[data-id]");
// cartItems.forEach(function (span) {
//     span.addEventListener("click", function () {
//         var itemId = this.getAttribute("data-id");
//         removeItem(itemId);
//         // location.reload();
//         // loadHeaderFooter();
//         // ShoppingCart();

//     });
// });

// while (cartItems.length > 0) {
//     loadHeaderFooter();
//     ShoppingCart();
// }

// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart");
//   console.log(cartItems);
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
// }

// function cartItemTemplate(item) {
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <p class="cart-card__quantity">qty: 1</p>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
// </li>`;

//   return newItem;
// }

// renderCartContents();
