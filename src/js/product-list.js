import productList from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
// import {getProductsByCategory} from "./externalServices.mjs";

loadHeaderFooter();
const category = getParam("category")
productList(".product-list", category);

document.querySelector(".title").innerHTML = category;

// const products = getProductsByCategory(category);
// console.log(products);

// const response = fetch(baseURL + `products/search/${category}`);
// console.log(response);

// console.log(category);