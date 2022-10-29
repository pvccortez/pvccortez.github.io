import { addItemToCart, displayCart, } from './../Cart/addToCart.js'
import { formatPrice } from './../function.js'


function getProductFromShop(id)
{
    // Get cart from local storage
    const storageItem = localStorage.getItem('store');
    let store = JSON.parse(storageItem);
    

    //Check if the cart is empty
    if(!store)
    {
        return {};
    }

    // Get product from the cart
    const product = store.find(item => item.id === id);

    // Check if the product exists in the cart
    if(!product)
    {
        return {};
    }

    return product;
}


function getElement(selector)
{
    const element = document.querySelector(selector);

    if(!element)
    {
        throw new Error("Unable to find");
    }

    return element;
}


export function displayProduct()
{
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const productCenter = document.querySelector('.product-center');
    const product = getProductFromShop(id);
    document.title = `Cortez Furniture | ${product.name}`;

    productCenter.innerHTML = getProductInfo(product);
}


function getProductInfo(product)
{
    const heroTitle = document.querySelector('.hero-center h3');
    const colors = product.colors;
    const addToCartBtn = document.querySelector('.product-cart-button');
    addToCartBtn.dataset.id = product.id;
    

    const colorStr = colors.map(color =>
        {
            return `<span class='product-color' style="background:${color}"></span>`;
        }).join(" ");

    const productStr = `<div class="product-center" data-id=${product.id}>
                            <img class='product-img' src="${product.image}" alt="${product.name}">

                            <div class="info-div">
                            <h2 class="product-name">${product.name}</h2>
                            <h3 class="product-company">By: ${product.company}</h3>
                            <h3 class="product-price">${formatPrice(product.price)}</h3>
                            <div class="product-colors-div">
                                ${colorStr}
                            </div>

                            <p class="product-description">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum fugit itaque reiciendis impedit 
                                consequuntur facere laudantium, quidem eum necessitatibus voluptate adipisci accusantium sunt 
                                ratione quibusdam. Cumque voluptatum corrupti quas officia!
                            </p>
                        </div>`;

    heroTitle.innerHTML = `Home | ${product.name}`;
    
    return productStr;
}

