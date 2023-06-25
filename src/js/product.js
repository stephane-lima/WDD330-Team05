import { getParam,loadHeaderFooter } from "./utils.mjs";
// import { findProductById } from "./externalServices.mjs";
import productDetails from "./productDetails.mjs";

loadHeaderFooter();

const productId = getParam("product");

productDetails(productId);
