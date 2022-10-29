import {toggleCart } from "./homepage/toggleCart.js";
import { getURLData } from "./src/getData.js";
import { setupStore, getProductFromStore } from "./src/setupStore.js";
import { displayProducts } from "./src/display.js";
import { setLocalStorage, getStorageItem, getElement} from "./function.js";
import { displayCart ,getProductFromCart } from "./Cart/addToCart.js";
import {toggleSidebar} from "./src/toggleSidebar.js";






window.addEventListener('DOMContentLoaded', async ()=>
{
    const container = getElement('.products-container');
    const products = await getURLData();
    toggleSidebar();
    toggleCart();

    const store = setupStore(products);
    setLocalStorage('store', store);

    const featured = store.filter(item => item.featured === true)
    displayProducts(featured, container);

    const cart = JSON.parse(localStorage.getItem('cart'));
    displayCart(cart);

});

