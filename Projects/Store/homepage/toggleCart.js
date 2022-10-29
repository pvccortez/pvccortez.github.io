import { getElement } from "../function.js";

export function toggleCart()
{
    const cartOverlay = getElement('.cart-overlay');
    const cartContainer = getElement('.cart-container');

    openCart(cartOverlay, cartContainer);
    closeCart(cartOverlay, cartContainer);
}

function openCart(cartOverlay, cartContainer)
{
    const cartBtn = getElement('.cart-btn');
    
    cartBtn.addEventListener('click', (e)=>
    {
        cartOverlay.classList.add('show-overlay');
        cartContainer.classList.add('show-cart');
    });
    
}

function closeCart(cartOverlay, cartContainer)
{
    const closeBtn = getElement('.close-btn');

    closeBtn.addEventListener('click', ()=>
    {
        cartOverlay.classList.remove('show-overlay');
        cartContainer.classList.remove('show-cart');
    });
}


export function autoOpenCart()
{
    const cartOverlay = getElement('.cart-overlay');
    const cartContainer = getElement('.cart-container');

    cartOverlay.classList.add('show-overlay');
    cartContainer.classList.add('show-cart');

    console.log("Automatically Open Cart");
}