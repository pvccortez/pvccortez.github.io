import { getStorageItem, setLocalStorage, formatPrice } from "../function.js";
import { getProductFromStore } from "../src/setupStore.js";
import { autoOpenCart } from "../homepage/toggleCart.js";

export function getElement(selector)
{
    const element = document.querySelector(selector);

    if(!element)
    {
        throw new Error("Unable to find");
    }

    return element;
}


export function findProduct(id)
{
    console.log('test');
}


export function getProductFromCart(id)
{
    // Get cart from local storage
    let storageItem = localStorage.getItem('cart');
    
    // Check if "cart" exists in local storage
    if(storageItem === null)
    {
        return null;
    }

    let cart = JSON.parse(localStorage.getItem('cart'));



    // Get product from the cart
    const product = cart.find(item => item.id === id);

    // Check if the product exists in the cart
    if(!product)
    {
        return {};
    }

    return product;
}


export function addItemToCart(id)
{
    let product = getProductFromStore(id);
    let cartItem = getProductFromCart(id)
    let cart = JSON.parse(localStorage.getItem('cart'));

    // Cart doesn't exist, add item, add to local storage
    if(cart === null)
    {
        product.amount = 1;
        cart = [product];
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(cart);
        displayCart(cart);
        autoOpenCart();
        return;
    }

    // Check if the item exists in the cart
    if(Object.keys(cartItem).length === 0)
    {
        product.amount = 1;
        let cart = getStorageItem('cart');
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        displayCart(cart);
        autoOpenCart();
        return;
    }

     let itemCount = 0;
    
    for(let i = 0; i < cart.length; i++ )
    {
        if(cart[i].id === product.id)
        {
            cart[i].amount = parseInt(cart[i].amount) + 1;
            setLocalStorage('cart', cart);
            break;
        }
    }

    displayCart(cart);
    
    autoOpenCart();
}


export function displayCart(cart)
{
    const cartHTML = document.querySelector('.cart-center');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.querySelector('.cart-total');

    let counter = 0;
    let priceCtr = 0;

    if(!cart)
    {
        cartHTML.innerHTML = "";
        return;
    }


    const cartStr = cart.map(item =>
        {
            counter += parseInt(item.amount);
            priceCtr += item.price * item.amount;

            return `
                    <!-- Single Cart Item -->
                    <div class="cart-item" data-id="${item.id}">
                        <img src="${item.image}" alt="${item.name}">

                        <div class="item-info">
                            <h3 class="item-name">${item.name}</h3>
                            <h3 class="item-price">${formatPrice(item.price)}</h3>
                            <button class="remove-item-btn" data-id="${item.id}">Remove Item</button>
                        </div>

                        <div class="item-btns">
                            <button class="increment-btn ctr-btn">
                                <i class="fa-solid fa-chevron-up"></i>
                            </button>
                            <span class="item-ctr">${item.amount}</span>
                            <button class="decrement-btn ctr-btn">
                                <i class="fa-solid fa-chevron-down"></i>
                            </button>
                        </div>
                    </div>`
        }).join("");


    
    cartHTML.innerHTML = cartStr;
    cartCount.innerHTML = parseInt(counter);
    cartCount.dataset.count = counter;
    cartTotal.dataset.total = priceCtr;
    cartTotal.innerHTML = formatPrice(priceCtr);

    incrementBtns();
    decrementBtns();
    removeBtns();
}


function incrementBtns()
{
    const incBtns = [...document.querySelectorAll('.increment-btn')];

    incBtns.map(btn =>
        {
            btn.addEventListener('click', e =>
            {
                const id = e.target.parentElement.parentElement.parentElement.dataset.id;
                increaseAmount(e, id);
            });
        });
}


function increaseAmount(e, id)
{
    const cart = JSON.parse(localStorage.getItem('cart'));
    const amountElement = e.target.parentElement.parentElement.querySelector('.item-ctr');
    const cartCount = document.querySelector('.cart-count')
    const cartTotal = document.querySelector('.cart-total');
    

    let amount = -1;
    let price = -1;

    cart.find(item =>
        {
            
            if(item.id === id)
            {
                amount = parseInt(item.amount) + 1;
                item.amount = `${amount}`;
                price = item.price;
            }
        });

   
    localStorage.setItem('cart', JSON.stringify(cart));
    price += parseInt(cartTotal.dataset.total);

    amountElement.innerHTML = `${amount}`;
    cartCount.innerHTML = amount;
    cartCount.dataset.count = amount;
    cartTotal.dataset.total = `${price}`;
    cartTotal.innerHTML = formatPrice(price);
}


function decrementBtns()
{
    const btns = [...document.querySelectorAll('.decrement-btn')];

    btns.map(btn =>
        {
            btn.addEventListener('click', e =>
            {
                const id = e.target.parentElement.parentElement.parentElement.dataset.id;
                decreaseAmount(e, id);
            })
        });
}


function decreaseAmount(e, id)
{
    const cartCenter = document.querySelector('.cart-center');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.querySelector('.cart-total');
    const numItems = parseInt(cartCount.innerHTML);

    // Check if it is the last item in the cart
    if(numItems === 1)
    {
        cartCount.innerHTML = 0;
        cartCount.dataset.count = 0;
        cartTotal.innerHTML = '$0.00';
        cartTotal.dataset.total = 0;
        cartCenter.innerHTML = "";

        localStorage.removeItem('cart');
        return;
    }

    let amount = -1;
    let price = -1;
    let cart = JSON.parse(localStorage.getItem('cart'));
    const parent = e.target.parentElement.parentElement;
    const itemCtr = parent.querySelector('.item-ctr');

    // Find the product in the cart and update value
    cart.find(item =>
        {
            if(item.id === id)
            {
                amount = parseInt(item.amount) - 1;
                price = parseInt(item.price);
                item.amount = amount;
            }
        });


    // Update data in local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Check if last item was removed by decrement
    if(amount === 0)
    {
        e.target.parentElement.parentElement.romveChild(e.target);
    }

    cartCount.innerHTML = amount;
    cartCount.dataset.count = amount;
    itemCtr.innerHTML = `${amount}`;
    cartTotal.dataset.total = `${parseInt(cartTotal.dataset.total) - price}`;
    cartTotal.innerHTML = formatPrice(parseInt(cartTotal.dataset.total));
}


function removeItem(e, id)
{
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartCount = document.querySelector('.cart-count');
    const cartCenter = document.querySelector('.cart-center');
    const cartTotal = document.querySelector('.cart-total');
    const grandParent = e.target.parentElement.parentElement;
    let price = 0;
    let cartNum = parseInt(cartCount.dataset.count);
    console.log(cartNum);

    if(cartNum === 1)
    {
        cartCount.dataset.count = 0;
        cartCenter.removeChild(grandParent);
        cartCenter.innerHTML = "";
        cartCount.innerHTML = "0";
        cartTotal.innerHTML = '$0.00';
        localStorage.removeItem('cart');
        console.log("Edge Case: 1 Item in cart");
        return;
    }

    console.log(cart);

    const newCart = cart.filter(item =>
        {
            if(item.id === id)
            {
                price = parseInt(item.price);
            }

            else
            {
                return item;
            }
        });

    localStorage.setItem('cart', JSON.stringify(newCart));

    price = parseInt(cartTotal.dataset.total) - price;

    cartTotal.dataset.total = price;
    cartTotal.innerHTML = formatPrice(price);
    cartCount.dataset.count = --cartNum;
    cartCount.innerHTML = `${cartNum}`;    
    
    cartCenter.removeChild(grandParent);
}


function removeBtns()
{
    const btns = [...document.querySelectorAll('.remove-item-btn')];
    
    
    btns.forEach(btn =>
        {
            btn.addEventListener('click', e =>
            {
                const id = e.target.dataset.id;
                removeItem(e, id);
            });
        });
}








