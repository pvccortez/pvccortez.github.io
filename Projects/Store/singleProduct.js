import { addItemToCart, displayCart } from './Cart/addToCart.js';
import { getURLData} from './src/getData.js';
import { checkStore } from './function.js';
import { setupStore } from './src/setupStore.js';
import { toggleCart } from './homepage/toggleCart.js';
import { displayProduct } from './SingleProducts/displayProduct.js'
import { toggleSidebar } from './src/toggleSidebar.js';

window.addEventListener("DOMContentLoaded", async () =>
{
    if(checkStore())
    {
        const products = await getURLData();
        const store = setupStore(products);
        localStorage.setItem('store', JSON.stringify(store));
    }

    const addToCartBtn = document.querySelector('.product-cart-button');
    addToCartBtn.addEventListener('click', e =>
    {
        
        addItemToCart(e.target.dataset.id);
    });

    displayProduct();
    toggleSidebar();
    toggleCart();

    const cart = JSON.parse(localStorage.getItem('cart'));
    displayCart(cart);
})
